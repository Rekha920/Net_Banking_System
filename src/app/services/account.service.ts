import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AccountResponse } from '../models/account-response.model';

@Injectable({providedIn: 'root'})
export class AccountService{

    private httpClient : HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    fetchAccountDetails(accountId:number, limit:number):Observable<AccountResponse>{

        let params = new HttpParams;
        params = params.append('limit', limit.toString());
        let urlEndpoint:any = "http://localhost:8080/account/"+accountId;
        return this.httpClient.get<AccountResponse>(urlEndpoint,{
            params:params
        });
    }

} 