
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent implements OnInit {
  maxDate?: string;
  userList: any = []
  amountForm: FormGroup;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.amountForm = new FormGroup({
      userId: new FormControl(null, Validators.required),
      date: new FormControl(null, [Validators.required, Validators.email]),
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
    this.authenticationService.addUserAmount(user).subscribe(res => {
      this.router.navigate(['features/dashboard']);

    })

  }

  onReset(): void {
    this.amountForm.reset();
  }

}
