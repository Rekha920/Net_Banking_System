import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PayeeResponse } from '../models/payee-response.model';
import { GenericResponse } from '../models/generic-response.model';


@Injectable({providedIn: 'root'})
export class PayeeService{

    private httpClient : HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    fetchAllPayees(accountId: number):Observable<PayeeResponse>{

        let params = new HttpParams;
        params = params.append('accountId', accountId.toString());
        let urlEndpoint = "http://localhost:8080/payee";
        return this.httpClient.get<PayeeResponse>(urlEndpoint,{
            params:params
        });
    }

    registerPayee(accountId: number, payeeName:string, payeeAccountNo: number):Observable<GenericResponse>{
        let payeeRequest:any={
            payeeName:payeeName,
            payeeAccountNo:payeeAccountNo
        };
        let params = new HttpParams;
        params = params.append('accountId',accountId.toString());

        let urlEndpoint = "http://localhost:8080/payee";
        return this.httpClient.post<GenericResponse>(urlEndpoint, payeeRequest, {
            params:params
        });
    }

}