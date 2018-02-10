import { getTestBed } from '@angular/core/testing';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Rx';
import { LoginResponse } from "./../models";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { ApiService } from "./api.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Header } from 'primeng/primeng';

@Injectable()
export class DataService {

  constructor(private http: Http,
    private jwtService: JwtService,
    private apiService: ApiService
  ) { }

  // public isAuthenticated: boolean;
  //private currentUserSubject = new BehaviorSubject<User>(new User()); //step 7

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();
  loginResponse: LoginResponse;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1); //step 8
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();




  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // console.log('DataService:populate method.');
    if (this.jwtService.getToken() != null) {
      //to asp.net web api 
      //get credential from token and pass here
      this.apiService.getUserInfo('/GetUserInfoByToken', this.jwtService.getToken())
        .subscribe(
        data => this.setAuth(data),
        err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  attemptAuth(type, username, password): Observable<any> {
    return this.apiService.postLogin('/LoginUserForAngualr', username, password) //step 2
      .map(
      data => {
        //this.setAuth(data); //step 4
        return data;
      });
  }

  setAuth(loginResponse: LoginResponse) {
    // Save JWT sent from server in localstorage 
    this.jwtService.saveToken(loginResponse.tokenValue);  //step 5
    // Set current user data into observable
    // this.currentUserSubject.next(loginResponse.user);
    this.currentUserSubject.next(loginResponse.user);

    // this.isAdminUser.next(loginResponse.user.userType);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true); //step 8

  }

  getHeader(): Headers {
    var headers = new Headers();
    headers.append('content-type', 'application/json');
    return headers;
  }

  updateUser(updUser: User): Observable<any> {

    return this.apiService.updateUserInfo('/UpdateUser', updUser.userid, updUser) //step 2
      .map(
      data => {
        return data;
      });
  }

  addUser(addUser: User): Observable<any> {
    
        return this.apiService.addUser('/AddUser',  addUser) //step 2
          .map(
          data => {
            return data;
          });
      }

      
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    //  this.isAdminUser.next("");
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
  isUserAuthenticated(): boolean {
    let isvalue: boolean = false;
    this.isAuthenticated.take(0).subscribe(function (data) {
      isvalue = data;
    });
    return isvalue;

  }
  getCurrentUser(): User {
    return new User();

  }
  getAllUsers(): Observable<any> {

    return this.apiService.getAllUserInfo('/GetAllUsers') //step 2
      .map(
      data => {
        return data;
      });
  }

}

