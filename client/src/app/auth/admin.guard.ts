import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService, JwtService } from '../Services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataService: DataService,
    private jwtService: JwtService
  ) { } Router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isAdmin: boolean = false;
    this.dataService.currentUser.subscribe(data => {
      if (data.userType === "A")
        isAdmin = true;
    })
    return isAdmin;
  }
}
