import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { FormTexts } from '../../authentication/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [HeaderComponent,FormsModule]
})
export class DashboardComponent implements OnInit {
  userList: any = []
  user: any;
  todaysDate: string = ''
  firstDayOfMonth: string = '';
  dateList: any = [];
  maptest: { [key: string]: { [key: string]: string } } = {};
  mapItemList:{[key:string]:string}={}
  changeItemList:any=[];
  mapChangeItemList:{[key:string]:string}={}
  mapsetValueChaneList: { [key: string]: { [key: string]: string } } = {};
  monthlyUserData: any

  constructor(private authenticationService: AuthenticationService, private router: Router) {
this.getDateList();
this.getMonthlyUserData();

  } 

  ngOnInit(): void {
    this.getAllUserList() 
    this.authenticationService.getLoggedUser();
   
  }
  getAllUserList()
  {
    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
    })
    
  }
  onBlurItemEvent(event: FocusEvent, dateValue:string): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.mapItemList[dateValue]=inputValue;
    //this.mapChangeItemList[date]=inputValue
    let model={
      date:dateValue,
      item:inputValue
    }
    let index=this.changeItemList.findIndex((item: { date: string; }) => item.date ===model.date );
    console.log(index)
    if(index!=-1)
      {
        this.changeItemList[index]=model;
      }
      else{
        this.changeItemList.push(model);
      }
    console.log(this.changeItemList);
    //console.log(this.mapChangeItemList)



    
  }
  onBlurEvent(event: FocusEvent, date:string): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const userId = inputElement.id;
    if(!this.mapsetValueChaneList[date]){
      this.mapsetValueChaneList[date] = {};
    }
    this.mapsetValueChaneList[date][userId]=inputValue;

    //console.log(this.mapsetValueChaneList)

    
  }
  getDateList() {
    let day = new Date().getDate()
    let month = (new Date().getMonth() + 1).toString()
    let year = new Date().getFullYear().toString();
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

  }
  getMonthlyUserData() {
    this.authenticationService.getMonthlyCost(this.dateList[0], this.dateList[this.dateList.length-1]).subscribe(res => {
      this.monthlyUserData = res.result;
      this.monthlyUserData.forEach((element: any) => {
        this.setValue(element.date, element.userId.toString(), element.amount.toString());
        this.mapItemList[element.date]=element.item;
        
        
      });

    })
  }
  setValue(firstDayOfMonth: string, key: string, value: string): void {
    if (!this.maptest[firstDayOfMonth]) {
      this.maptest[firstDayOfMonth] = {};
    }
    this.maptest[firstDayOfMonth][key] = value.toString();
    }
  logout() {
    this.authenticationService.logout()

    // window.location.href = '/';
    this.router.navigate([""]);


  }
  home() {
    this.router.navigate(["features/admin"])
  }
  getLoggedUser() {

    this.user = this.authenticationService.getLoggedUser()

  }
}
