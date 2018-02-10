import { Component, OnInit } from '@angular/core';
import { HttpModule } from "@angular/http";
import { DataService, JwtService, ApiService } from './Services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']//,
  //providers:[DataService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = "finance application";
    this.dataService.populate();
  }


}
