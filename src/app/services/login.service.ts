import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({providedIn: 'root'})
export class LoginService{

    private httpClient : HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    checkCredentials(loginRequest: LoginRequest):Observable<LoginResponse>{

        let urlEndpoint:any = "http://localhost:8080/login";
        return this.httpClient.post<LoginResponse>(urlEndpoint, loginRequest);
    }

    addCredentials(loginRequest: LoginRequest, registrationId:number):Observable<LoginResponse>{
        
        let urlEndpoint:any = "http://localhost:8080/login/add/"+registrationId;
        return this.httpClient.post<LoginResponse>(urlEndpoint, loginRequest);
    }

} 