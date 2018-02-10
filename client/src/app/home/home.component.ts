import { Component, OnInit } from '@angular/core';
import { Route,Router } from "@angular/router";
import { DataService } from './../Services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private dataService:DataService) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe(data => {
      
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
