import { async } from '@angular/core/testing';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
import { CommonService } from './../../Services/common.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/RX';

import { User } from '../../models';
import { DialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { error } from 'util';
import { HttpResponse } from 'selenium-webdriver/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Console } from '@angular/core/src/console';
import * as HttpStatus from 'http-status-codes';

@Component({
  selector: 'app-adminindex',
  templateUrl: './adminindex.component.html',
  styleUrls: ['./adminindex.component.css']
})
export class AdminindexComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService) {
  }
  currentUser: User;
  isUser: boolean;
  displayDialog: boolean;
  isNewRecord: boolean;
  selectedUser: User;
  newUser: boolean;
  users: User[];
  cols: any[];
  msgs: Message[] = [];
  errs: string;
  classname: 'p-growl';

  ngOnInit() {

    this.dataService.getAllUsers().subscribe(
      data => {
        this.users = data;
      });

    this.cols = [
      { field: 'firstName', header: 'firstName' },
    ];
  }

  onRowSelect(event) {
    this.newUser = false;
    this.currentUser = this.cloneUser(event.data);
    this.displayDialog = true;
    this.isNewRecord = false;
  }

  cloneUser(u: User): User {
    let user: User = new User();
    for (let prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }

  showDialogToAdd() {
    this.newUser = true;
    this.currentUser = new User();
    this.displayDialog = true;
    this.responsive = true;
    this.isNewRecord = true;
  }
  responsive: boolean = false;

  save() {
    let users = [...this.users];
    let msg: Map<string, string> = new Map<string, string>();
    if (this.newUser) {
      //Add new user..
      this.dataService.addUser(this.currentUser)
        .subscribe(
        data => {
          msg["serverity"] = "success";
          msg["summary"] = "Success Message";
          msg["detail"] = "Record added successfully.";
          this.msgs = [];
          this.msgs.push({ severity: msg["serverity"], summary: msg["summary"], detail: msg["detail"] });
          users.push(data);
          this.users = users;
          this.currentUser = null;
          this.displayDialog = false;
          this.isNewRecord = false;
        },

        err => {
          msg["serverity"] = "error";
          msg["summary"] = "Error Message";
          msg["detail"] = "Not Saved due to some technical error";
          this.msgs.push({ severity: msg["serverity"], summary: msg["summary"], detail: msg["detail"] });
          this.currentUser = null;
          this.displayDialog = false;
        });


    }
    else {
      //Edit USer...
      this.dataService.updateUser(this.currentUser)
        .subscribe(
        data => {
          let usr: User = new User();
          usr.userid = data.userId;
          usr.userType = data.userType;
          usr.firstname = data.firstName;
          usr.lastname = data.lastName;
          usr.mobile = data.mobile;
          usr.email = data.email;
          usr.username = data.userName;
          usr.password = data.password;

          users[this.findSelectedUserIndex()] = usr;
          msg["serverity"] = "success";
          msg["summary"] = "Success Message";
          msg["detail"] = "Record update successfully.";
          this.msgs = [];
          this.msgs.push({ severity: msg["serverity"], summary: msg["summary"], detail: msg["detail"] });
          this.users = users;
          this.currentUser = null;
          this.displayDialog = false;
        },

        err => {
          msg["serverity"] = "error";
          msg["summary"] = "Error Message";
          msg["detail"] = "Not Saved due to some technical error";
          this.msgs.push({ severity: msg["serverity"], summary: msg["summary"], detail: msg["detail"] });
          this.currentUser = null;
          this.displayDialog = false;
        });
    }
  }

  // showError(error: any) {
  //   this.msgs.push({ severity: 'error', summary: 'error message', detail: error });
  //   this.currentUser = null;
  //   this.displayDialog = false;
  // }

  findSelectedUserIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }
}


