import { Component, OnInit, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from './../../Services/data.service';
import { User } from './../../models';
import { ShowAuthedDirective } from "./../directive/show-authed.directive";
import { ActivatedRoute, Router } from "@angular/router";
import { MegaMenuModule, MenuItem } from 'primeng/primeng';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginMenu: boolean = true;
  registerMenu: boolean = true;
  isUserAuth: boolean = false;
  currentUser: User;
  items: MenuItem[];

  constructor(private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.dataService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        if (window.location.href === 'http://localhost:4200/' && this.currentUser.userType == 'A') {
          this.router.navigateByUrl('/Admin');
        }
        else if (window.location.href === 'http://localhost:4200/' && this.currentUser.userType == 'U') {
          this.router.navigateByUrl('/users');
        }
      }
    )
  }

  getCurrentUserName(): string {
    //let currentusername : string ;
    this.dataService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;

      }
    )
    return this.currentUser.firstname;
  }


  onMenuClick(value: string): void {
    if (value == "signin" || value == "register" || value == "home" || value == "aboutus") {

    }
    else if (value == "signout") {
      this.dataService.purgeAuth();
      this.isUserAuth = false;
    }
    else {
      this.dataService.currentUser.subscribe(data => {
        console.log("AdminIndex OnInit : ");
        if (data.userType == "A") {
          this.router.navigateByUrl('/admin');
        }
        else if (data.userType == "U") {
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
}
