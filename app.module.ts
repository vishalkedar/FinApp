import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomefirstComponent } from './home/homefirst/homefirst.component';
import { HomesecondComponent } from './home/homesecond/homesecond.component';
import { AboutComponent } from './about/about.component';
import { AboutfirstComponent } from './about/aboutfirst/aboutfirst.component';
import { AboutsecondComponent } from './about/aboutsecond/aboutsecond.component';
import { DataService } from './dataservice';
import { HttpClientModule} from '@angular/common/http'


const routes: Routes = [
  {
    path: "home", component: HomeComponent,
    children: [
      {
        path: "homefirst", component: HomefirstComponent
      },
      {
        path: "homesecond", component: HomesecondComponent
      },
    ]

  },


  {
    path:':quote/about', component: AboutComponent,
    children: [
      {
        path: "aboutfirst", component: AboutfirstComponent
      },
      {
        path: "aboutsecond", component: AboutsecondComponent
      },
    ]
  },

  
  

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomefirstComponent,
    HomesecondComponent,
    AboutComponent,
    AboutfirstComponent,
    AboutsecondComponent
  ],
  imports: [
    BrowserModule, FormsModule,HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
