import { Observable } from 'rxjs/Observable';
import { User } from './../models';
import { LoginResponse } from './../models/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    Headers, Http, Response, URLSearchParams, RequestOptions, RequestMethod, Request, RequestOptionsArgs

} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
    constructor(
        private http: Http,
        private jwtService: JwtService
    ) { }

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        if (this.jwtService.getToken() != null) {
            headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
        }
        else
            headersConfig['Authorization'] = null;

        return new Headers(headersConfig);
    }
    postLogin(path: string, username: string, password: string): Observable<LoginResponse> {

        let body = JSON.stringify(password);
        return this.http.post(
            `${environment.api_url}${path}?username=${username}`,
            body, { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    updateUserInfo(path: string, userid: number, updUser: User): Observable<any> {

        let body = JSON.stringify(updUser);
        return this.http.put(
            `${environment.api_url}${path}?userId=${userid}`,
            body, { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());


    }

    addUser(path: string, updUser: User): Observable<any> {

        let body = JSON.stringify(updUser);
        return this.http.post(
            `${environment.api_url}${path}`,
            body, { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());


    }


    getUserInfo(path: string, tokenvalue: string): Observable<LoginResponse> {

        let body = JSON.stringify(tokenvalue);
        return this.http.post(
            `${environment.api_url}${path}`,
            body, { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    getAllUserInfo(path: string): Observable<User> {

        // let body = JSON.stringify();
        return this.http.post(
            `${environment.api_url}${path}`,
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(obj[property]));

        return result.join(",");
    }



}