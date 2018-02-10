import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService, JwtService } from '../Services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private dataService: DataService,
        private jwtService: JwtService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.jwtService.isAuthenticated();
    }
}