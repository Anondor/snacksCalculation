import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [ReactiveFormsModule,SelectDropDownModule,CommonModule, FormsModule, ],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent implements OnInit{
  normalUserType:string='2';
  userValue: any;
  reportForm:FormGroup;
  maxDate?:string;
  userList: any = []
  todaysDate: any = new Date();
  singleSelect: any = null;
  config = {
displayKey: "name", // if objects array passed which key to be displayed defaults to description
search: true,
limitTo: 0,
height: "250px",
enableSelectAll: true,
};

  constructor(private authenticationService:AuthenticationService,private router:Router)
{  this.getLoggedUser();
      this.reportForm = new FormGroup({
      userId:new FormControl(null,Validators.required),
      fromDate:new FormControl(null,[Validators.required,Validators.email]),
      toDate:new FormControl(null,[Validators.required])
    });   
}
  ngOnInit(): void {
    const today=new Date();
    this.maxDate=today.toISOString().split('T')[0];

    this.reportForm.value.toDate=this.maxDate;
         this.getAllUserList()
        

  }
  getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
    })

  }
  generateReport()
  {
    let model=this.reportForm.value;
    if(model.fromDate>model.toDate)
    {
      let temp=model.toDate;
      model.toDate=model.fromDate;
      model.fromDate=temp;
    }
    debugger

        if(!!this.singleSelect.id)
          {
            model.userId=this.singleSelect.id;
          }
          else
          {
            model.userId = this.userValue.Id;
          }

    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    this.authenticationService.getGeneratedFile(model.fromDate,model.toDate,model.userId).subscribe(res=>{
      const fileName = `MonthlyReport_${this.todaysDate}.xlsx`;
      this.authenticationService.DownloadFile(res, fileName, fileType);
       

    })

  }
  getLoggedUser() {

    this.userValue = this.authenticationService.getLoggedUser()



  }



}
