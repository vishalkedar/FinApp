import { Router } from '@angular/router';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Rx';
import { User, LoginResponse } from "./../models";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { ApiService } from "./api.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class CommonService {

  constructor(private dataService: DataService, private router: Router) { }

  getOnInit(value: string) {
    this.dataService.currentUser.subscribe(data => {
      if (data.userType == "A" && value=='admin') {
        this.router.navigateByUrl('/admin');
      }
      else if (data.userType == "U" && value=='user') {
         this.router.navigateByUrl('/users');
      }
      else {
        this.router.navigateByUrl('/');
      }
    },
      err => this.router.navigateByUrl('/')
    );
  }



}
