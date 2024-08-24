import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertService } from '../../Shared/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './balance-summary.component.html',
  styleUrl: './balance-summary.component.css'
})
export class BalanceSummaryComponent {
  normalUserType: string = '2';
  userValue: any;
  reportForm: FormGroup;
  maxDate?: string;
  userList: any = []
  todaysDate: any = new Date();
  userAccountList: any;
  userName: string = '';
  pos:number=1;


  constructor(private authenticationService: AuthenticationService,
    private alertService: AlertService, private router: Router) {
    this.getLoggedUser();
    this.reportForm = new FormGroup({
      userId: new FormControl(null),
      fromDate: new FormControl(null, [Validators.required, Validators.email]),
      toDate: new FormControl(null, [Validators.required])
    });
  }
  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.reportForm.value.toDate = this.maxDate;
    this.getAllUserList()


  }
  getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
    })

  }
  loadBalance() {
    
    let model = this.reportForm.value;
    if (model.fromDate > model.toDate) {
      this.alertService.alert('alert-warning', 'from date must be smaller or equal to toDate');
    }
    else {
      if (model.userId == null) 
      {
        model.userId = this.userValue.Id;
      
      }
      var id=parseInt(model.userId);
      for(var i=0;i<this.userList.length;i++)
        {
         
         if(this.userList[i].id==id){
          this.userName=this.userList[i].name;
         
         }
        }

      this.authenticationService.getUserAmountById(model.fromDate, model.toDate, model.userId).subscribe(res => {


        this.userAccountList = res.result;
     

      })
    }




  }
  getLoggedUser() {

    this.userValue = this.authenticationService.getLoggedUser()



  }



}
