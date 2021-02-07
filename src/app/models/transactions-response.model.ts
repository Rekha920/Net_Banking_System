import { DatePipe } from '@angular/common';

export class TransactionResponse{

    transactionId: number;
    transactionDate: string;
    remarks: string;
    debit: number;
    credit: number;
    balance: number;

}