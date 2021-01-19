import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationResponse } from '../models/registration-response.model';
import { RegistrationRequest } from '../models/registration-request.model';


@Injectable({providedIn: 'root'})
export class RegistrationService{

    private httpClient : HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    registerUser(registrationRequest: RegistrationRequest):Observable<RegistrationResponse>{

        let urlEndpoint:any = "http://localhost:8080/registration";
        return this.httpClient.post<RegistrationResponse>(urlEndpoint, registrationRequest);
    }

    retrieveUser(loginId: number):Observable<RegistrationRequest>{
        
        let urlEndpoint:any = "http://localhost:8080/profile/"+loginId;
        return this.httpClient.get<RegistrationRequest>(urlEndpoint);
    }

    updateUser(registrationRequest: RegistrationRequest):Observable<RegistrationResponse>{

        let urlEndpoint:any = "http://localhost:8080/profile";
        return this.httpClient.patch<RegistrationResponse>(urlEndpoint, registrationRequest);
    }

} 