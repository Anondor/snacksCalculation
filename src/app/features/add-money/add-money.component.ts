
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, CommonModule, FormsModule, SelectDropDownModule,],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent implements OnInit {
  maxDate?: string;
  userList: any = []
  amountForm: FormGroup;

  userText: any;
  singleSelect: any = null;

  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 0,
    height: "250px",
    enableSelectAll: true,
  };

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.amountForm = new FormGroup({
      userId: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });

  }


  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.getAllUserList()

  }
  getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;
    })

  }
  saveAmountData() {
    let user = this.amountForm.value;
    user.userId = this.singleSelect.id

    this.authenticationService.addUserAmount(user).subscribe(res => {
      //this.router.navigate(['features/dashboard']);

    })


  }

  onReset(): void {
    this.amountForm.reset();
  }

}
