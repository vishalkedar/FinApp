import { Errors } from './../../models/errors.model';
import { User, LoginResponse } from './../../models/user.model';
import { DataService } from './../../Services/data.service';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { ActivatedRoute, Router } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { SelectItem, Message } from 'primeng/components/common/api';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Error = new Error();
  isSubmitting = false;
  authForm: FormGroup;
  loginResponse: LoginResponse;
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,

    private fb: FormBuilder
  ) {

    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  submitForm(): void {
    //call service to validate user
      this.isSubmitting = true;
    this.errors = new Error();
    //console.log('Create LoginResponse object here.');
    this.loginResponse = new LoginResponse();
    let credentials = this.authForm.value;

    if (this.authForm.value.email == "") {
      this.msgs.push({ severity: 'error', summary: 'Error:', detail: 'Please enter username.' });
    }
    else {
      this.dataService.attemptAuth(this.authType, this.authForm.value.email, this.authForm.value.password)  //step 1
        .subscribe(
        data => {
          this.setLoginData(data);
          console.log(this.loginResponse);
          if (this.loginResponse.user.userType === "A") {
            this.router.navigateByUrl('/admin');
          }
          else {
            this.router.navigateByUrl('/users');
          }
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
          this.msgs.push({ severity: 'error', summary: 'Error:', detail: '' + this.errors + '' });
        });
    }
  }

  setLoginData(loginResponse: LoginResponse): void {
   // console.log('assigned values to LoginResponse object here.');
    this.loginResponse.tokenValue = loginResponse.tokenValue;
    this.loginResponse.user = loginResponse.user;
    this.dataService.setAuth(loginResponse);
  }
}
