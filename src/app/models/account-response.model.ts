import { TransactionResponse } from "./transactions-response.model";

export class AccountResponse{

    accountId : number;
    accountType :  string;
    customerName : string;
    balance : number;
    transactions : Array<TransactionResponse>;
    loginId: number;
}