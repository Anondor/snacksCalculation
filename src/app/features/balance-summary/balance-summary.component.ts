import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertService } from '../../Shared/alert.service';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserBalanceModel } from '../../authentication/models/user.model';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [ReactiveFormsModule,SelectDropDownModule, FormsModule,CommonModule,NgxDatatableModule],
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
  singleSelect: any = null;
  config = {
displayKey: "name", // if objects array passed which key to be displayed defaults to description
search: true,
limitTo: 0,
height: "250px",
enableSelectAll: true,
};

columns = [ { name: 'Date' },{ name: 'Sl' }, { name: 'Amount' }];
rawEvent: any;
contextmenuRow: any;
contextmenuColumn: any;
ColumnMode = ColumnMode;

rows :any= []


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
      this.alertService.alert('alert-warning', 'From date must be smaller or equal to toDate');
    }
    else {
      if (model.userId == null) 
      {
        if(!!this.singleSelect)
        {
          model.userId=this.singleSelect.id;
        }
        else
        {
          model.userId = this.userValue.Id;
        }
        
      
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
        this.rows=[]
        for(let i=0;i<res.result.length;i++)
        {          
            var model={
              sl:i+1,
              amount:this.userAccountList[i].amount,
              date:this.userAccountList[i].date
            }

          
          this.rows.push(model);
        }

        console.log(this.rows)
     

      })
    }




  }
  onTableContextMenu(contextMenuEvent:any) {
    console.log(contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }
  getLoggedUser() {

    this.userValue = this.authenticationService.getLoggedUser()



  }



}
