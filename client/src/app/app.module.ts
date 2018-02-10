import { Errors } from './models/errors.model';
import { CommonService } from './Services/common.service';
import { NgModule, Input, Output, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, Http } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import {
  LoginComponent, HeaderComponent, FooterComponent, RegisterComponent,
  PagenotfoundComponent, SignupComponent
} from './shared';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { AdminindexComponent, UserdetailsComponent } from './admin';
import { DataService, JwtService, ApiService, NoAuthGuard } from "./Services";
import { AuthGuard } from "./Services/auth-gaurd.service";
import { UserindexComponent } from "./users";
import { ShowAuthedDirective } from './shared/directive/show-authed.directive';
import { ProfileComponent } from './users/profile/profile.component';
import { AdminGuard } from './auth/admin.guard';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule, ConfirmationService, SharedModule, GrowlModule } from 'primeng/primeng';
import {
  MessageModule, MessagesModule, MegaMenuModule, MenubarModule,
  DataTableModule, DialogModule, ButtonModule, 
} from 'primeng/primeng';


const appRoutes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "aboutus", component: AboutusComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "admin", component: AdminindexComponent, canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "users", component: UserindexComponent, canActivate: [AuthGuard]
  },
  {
    path: "profile", component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "**", component: PagenotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HeaderComponent, FooterComponent,
    AboutusComponent, RegisterComponent, HomeComponent, PagenotfoundComponent,
    SignupComponent, AdminindexComponent, UserdetailsComponent, UserindexComponent, ShowAuthedDirective, ProfileComponent
  ],
  imports: [
    BrowserModule, HttpModule, ReactiveFormsModule,
    FormsModule, RouterModule.forRoot(appRoutes)
    ,BrowserAnimationsModule,  GrowlModule, MessageModule, MessagesModule, MegaMenuModule, MenubarModule,
    DataTableModule, DialogModule, ButtonModule
  ],
  //exports:[ShowAuthedDirective],
  providers: [DataService, JwtService, ApiService, AuthGuard, NoAuthGuard, CommonService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  //let str :string ="sdfsdf";cd c  
  if(Errors) {

  }


}
