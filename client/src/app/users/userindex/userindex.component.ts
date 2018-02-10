import { CommonService } from './../../Services/common.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/models';

@Component({
  selector: 'app-userindex',
  templateUrl: './userindex.component.html',
  styleUrls: ['./userindex.component.css']
})
export class UserindexComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService) {

  }

  ngOnInit() {
    this.commonService.getOnInit('user');
  }
}

