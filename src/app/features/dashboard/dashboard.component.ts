import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { FormTexts } from '../../authentication/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [HeaderComponent]
})
export class DashboardComponent implements OnInit {
  userList: any = []
  user: any;
  todaysDate: string = ''
  firstDayOfMonth: string = '';
  dateList: any = [];
  maptest: { [key: string]: { [key: string]: string } } = {};


  monthlyUserData: any
  constructor(private authenticationService: AuthenticationService, private router: Router) {



  }

  ngOnInit(): void {
    this.getAllUserList()
    this.getDateList();
    this.getMonthlyUserData();
    this.authenticationService.getLoggedUser();
   

  }
  getAllUserList()
  {
    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
      //this.setValue(this.userList.Date, this.userList.UserId, this.userList);

    })
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

    }

    console.log(this.dateList);

  }
  getMonthlyUserData() {
    this.authenticationService.getMonthlyCost(this.dateList[0], this.dateList[this.dateList.length-1]).subscribe(res => {
      this.monthlyUserData = res.result;
     
      this.monthlyUserData.forEach((element: any) => {
        this.setValue(element.Date, element.UserId, element);
        
      });

      //console.log()
    })
  }
  setValue(firstDayOfMonth: string, key: string, value: any): void {
    if (!this.maptest[firstDayOfMonth]) {
      this.maptest[firstDayOfMonth] = {};
    }
    this.maptest[firstDayOfMonth][key] = value;
    //console.log(this.maptest["1"][key])
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
