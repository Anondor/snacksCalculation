import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent implements OnInit{
  reportForm:FormGroup;
  maxDate?:string;
  userList: any = []
  todaysDate: any = new Date();
  constructor(private authenticationService:AuthenticationService,private router:Router)
{
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
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    this.authenticationService.getGeneratedFile(model.fromDate,model.toDate,model.userId).subscribe(res=>{
      const fileName = `MonthlyReport_${this.todaysDate}.xlsx`;
      this.authenticationService.DownloadFile(res, fileName, fileType);
      
       this.router.navigate(['features/dashboard']);

    })

  }



}
