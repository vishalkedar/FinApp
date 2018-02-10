import { Component, OnInit, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from './../../Services/data.service';
import { User } from 'app/models';
import { ActivatedRoute, Router } from "@angular/router";
import { MegaMenuModule, MenuItem } from 'primeng/primeng';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
import { CommonService } from 'app/Services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataServcie: DataService,
 private commonService:CommonService ) { }

  ngOnInit() {
    //this.commonService.getOnInit('user');
    let str ="str";
  }

}
