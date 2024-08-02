import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserCostInfoModel } from '../../authentication/models/user.model';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [HeaderComponent, FormsModule,BsDatepickerModule]
})
export class DashboardComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> ;
  selectedMonth:Date | null = null;
  normalUserType:string='2';
  userList: any = []
  userValue: any;
  todaysDate: any = new Date();
  todaysMonth:any= new Date().getMonth();
  todaysYear:any=new Date().getFullYear();
  selectMonth=this.todaysMonth
  selectYear=this.todaysYear

  firstDayOfMonth: string = '';
  dateList: any = [];

  maptest: { [key: string]: { [key: string]: string } } = {};

  mapUserTotalCostList: { [key: number]: number } = {}
  mapItemList: { [key: string]: string } = {}
  mapUserAmountList: { [key: number]: number } = {}
  changeItemList: any = [];
  changeCostList: any = [];

  userCostInfoList: any = [];

  mapsetValueChaneList: { [key: string]: { [key: string]: string } } = {};
  monthlyUserData: any
  userTotalAmount: any = [];
  userTotalCost: any = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.bsConfig = {
      dateInputFormat: 'MM/YYYY',
      minMode: 'month',
      containerClass: 'theme-dark-blue'
    };

  }

  ngOnInit(): void {

    this.dateList=[];
    this.getAllUserList()
    this.getUserAmount();
    this.getDateList();
    this.getLoggedUser();
  }
  getSelectedMonthYear()
  {

    if(this.selectedMonth)
    {
      let year = this.selectedMonth.getFullYear();
      let month = this.selectedMonth.getMonth() + 1; 
      const firstDayNextMonth = new Date(year, month, 1);
      const lastDayCurrentMonth = new Date(firstDayNextMonth);
      lastDayCurrentMonth.setDate(firstDayNextMonth.getDate() - 1);
      let lastDay=lastDayCurrentMonth.getDate();
      if(month== (new Date().getMonth()+1))
      {
        lastDay= new Date().getDate();
      }
      this.getDateListValue(lastDay, month.toString(),year.toString());
      this.selectMonth=this.selectedMonth.getMonth();
      this.selectYear=this.selectedMonth.getFullYear();
    }
    this.getMonthlyUserData();
  }
  getDateListValue(day:number,month:string,year:string)
  {
    this.dateList=[];
    if (month.length == 1) month = '0' + month;
    for (let daynum = 1; daynum <= day; daynum++) {
      let datevalue = daynum.toString();
      if (datevalue.length == 1) {
        datevalue = '0' + datevalue;
      }
      let date = year + '-' + month + '-' + datevalue;
      this.dateList.push(date)
      if (!this.maptest[date]) {
        this.maptest[date] = {};
      }

    }
    this.getMonthlyUserData();


  }
  getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
      this.userList.forEach((element: any) => {
        this.mapUserTotalCostList[element.id] = 0;

      });

    })

  }
  onBlurItemEvent(event: FocusEvent, dateValue: string): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.mapItemList[dateValue] = inputValue;
    let model = {
      date: dateValue,
      item: inputValue
    }
    let index = this.changeItemList.findIndex((item: { date: string; }) => item.date === model.date);
    if (index != -1) {
      this.changeItemList[index] = model;
    }
    else {
      this.changeItemList.push(model);
    }




  }
  exportExcel() {

    var fromDate=this.dateList[0], toDate=this.dateList[this.dateList.length - 1]
    if(this.selectedMonth)
      {
        let year = this.selectedMonth.getFullYear();
        let month = this.selectedMonth.getMonth() + 1; 
        const firstDayNextMonth = new Date(year, month, 1);
        const lastDayCurrentMonth = new Date(firstDayNextMonth);
        lastDayCurrentMonth.setDate(firstDayNextMonth.getDate() - 1);
        let lastDay=lastDayCurrentMonth.getDate();
        fromDate=year.toString()+'-';
        if(month.toString.length==1)fromDate+='0';
        fromDate+=month.toString()+'-01';
        toDate=year.toString()+'-';
        if(month.toString.length==1)toDate+='0';
        toDate+=month.toString()+'-'+lastDay.toString();
        

      }

    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    this.authenticationService.getExportFile(fromDate, toDate).subscribe(res => {
      const fileName = `MonthlyReport_${this.todaysDate}.xlsx`;
      this.authenticationService.DownloadFile(res, fileName, fileType);

    })
  }
  getUserAmount() {
    this.authenticationService.getUserAmount().subscribe(res => {
      this.userTotalAmount = res.result;
      this.userTotalAmount.forEach((element: any) => {
        this.mapUserAmountList[element.userId] = element.totalAmount;

      });
      this.authenticationService.getUserCost().subscribe(res => {
        this.userTotalCost = res.result;
        this.userTotalCost.forEach((element: any) => {
          this.mapUserAmountList[element.userId] -= element.totalAmount;
        });

      })
    })


  }
  onBlurEvent(event: FocusEvent, dateValue: string): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const userId = inputElement.id;
    if (!this.mapsetValueChaneList[dateValue]) {
      this.mapsetValueChaneList[dateValue] = {};
    }
    this.mapsetValueChaneList[dateValue][userId] = inputValue;

    let model = {
      date: dateValue,
      userId: userId,
      amount: inputValue
    }
    let index = this.changeCostList.findIndex((item: { date: string, id: string }) => item.date === model.date && item.id == model.userId);
    if (index != -1) {
      this.changeCostList[index] = model;
    }
    else {
      this.changeCostList.push(model);
    }
  }

  getDateList() {
    let day = new Date().getDate()
    let month = (new Date().getMonth() + 1).toString()
    let year = new Date().getFullYear().toString();
    this.getDateListValue(day,month,year);

  }
  getMonthlyUserData() {
    this.authenticationService.getMonthlyCost(this.dateList[0], this.dateList[this.dateList.length - 1]).subscribe(res => {
      this.monthlyUserData = res.result;
  this.userList.forEach((element:any) => {

    this.mapUserTotalCostList[element.id]=0;
  });
 this.mapItemList={}

      this.monthlyUserData.forEach((element: any) => {
        this.setValue(element.date, element.userId.toString(), element.amount.toString());
        this.mapItemList[element.date] = element.item;
        this.mapUserTotalCostList[element.userId] += element.amount;
      });

    })


  }
  setValue(firstDayOfMonth: string, key: string, value: string): void {
    if (!this.maptest[firstDayOfMonth]) {
      this.maptest[firstDayOfMonth] = {};
    }
    this.maptest[firstDayOfMonth][key] = value.toString();
  }
  saveData() {
    this.userCostInfoList = [];
    this.changeItemList.forEach((element1: any) => {
      this.monthlyUserData.forEach((element2: any) => {
        if (element1.date == element2.date) {
          let model = element2;
          model.item = element1.item;
          this.userCostInfoList.push(model)
        }
      });
    });

    this.changeCostList.forEach((element: any) => {
      let model = element;

      let index = this.userCostInfoList.findIndex((item1: { date: string, userId: number }) => item1.date === element.date && item1.userId == parseFloat(element.userId))
      if (index != -1) {
        this.userCostInfoList[index].amount = parseFloat(element.amount)
      }
      else {
        let itemName = this.mapItemList[element.date];
        model.item = "";
        if (!!itemName) {
          model.item = itemName
        }
        this.userCostInfoList.push(model);
      }

    });

    this.authenticationService.addUserCost(this.userCostInfoList).subscribe(res => {
      this.ngOnInit()
    })

    
  }
  getLoggedUser() {

    this.userValue = this.authenticationService.getLoggedUser()

  }
}
