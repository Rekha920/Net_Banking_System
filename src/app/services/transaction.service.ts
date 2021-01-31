import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { TransferRequest } from '../models/transfer-request.model';
import { TransferResponse } from '../models/transfer-response.model';
import { TransactionRequest } from '../models/transaction-request.model';
import { TransactionResponse } from '../models/transactions-response.model';


@Injectable({providedIn: 'root'})
export class TransactionService{

    private httpClient : HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    transferFunds(transferRequest: TransferRequest, accountId: number):Observable<TransferResponse>{

        let urlEndpoint = "http://localhost:8080//transactions/account/"+accountId;
        return this.httpClient.post<TransferResponse>(urlEndpoint, transferRequest);
    }
    
    
    }

