import { Injectable } from "@angular/core";

@Injectable()
export class JwtService {
    getToken(): string {
        return window.localStorage['jwtToken']== undefined ? null:window.localStorage['jwtToken'] ;
    }
    saveToken(token: string): void {
        window.localStorage['jwtToken'] = token;
    }
    destroyToken(): void {
        window.localStorage.removeItem('jwtToken');
    }
    isAuthenticated():boolean {
        return this.getToken() != null;
    }

}