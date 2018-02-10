import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService } from './data.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  boolean {

    return !this.dataService.isAuthenticated;

  }
}