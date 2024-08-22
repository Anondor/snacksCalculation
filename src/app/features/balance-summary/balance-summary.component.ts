import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './balance-summary.component.html',
  styleUrl: './balance-summary.component.css'
})
export class BalanceSummaryComponent {
  normalUserType:string='2';
  userValue: any;
  reportForm:FormGroup;
  maxDate?:string;
  userList: any = []
  todaysDate: any = new Date();

  
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
  loadBalance()
  {
    let model=this.reportForm.value;
    if(model.fromDate>model.toDate)
    {
      let temp=model.toDate;
      model.toDate=model.fromDate;
      model.fromDate=temp;
    }
    if(model.userId==null)model.userId=this.userValue.Id
    /*
   
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    this.authenticationService.getGeneratedFile(model.fromDate,model.toDate,model.userId).subscribe(res=>{
      const fileName = `MonthlyReport_${this.todaysDate}.xlsx`;
      this.authenticationService.DownloadFile(res, fileName, fileType);
       

    })
      */

  }
  getLoggedUser() {

    this.userValue = this.authenticationService.getLoggedUser()



  }



}
