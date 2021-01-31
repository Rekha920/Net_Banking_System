import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AccountResponse } from '../models/account-response.model';
import { GenericResponse } from '../models/generic-response.model';
import { PayeeResponse } from '../models/payee-response.model';
import { RegistrationRequest } from '../models/registration-request.model';
import { TransferRequest } from '../models/transfer-request.model';
import { TransferResponse } from '../models/transfer-response.model';
import { AccountService } from '../services/account.service';
import { PayeeService } from '../services/payee.service';
import { RegistrationService } from '../services/registration.service';
import { TransactionService } from '../services/transaction.service';
import { RegistrationResponse } from '../models/registration-response.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountId: number;
  selectedPayeeId: number;
  isPayeeSelected :boolean;
  transactionsExist:boolean;
  customerDateOfBirth: Date;
  registerPayeeFLow: boolean;
  inSuffucientFundsMessage:any;
  payeeResponse : PayeeResponse;
  private route : ActivatedRoute;
  userProfile: RegistrationRequest;
  accountResponse : AccountResponse;
  private payeeService : PayeeService;
  private accountService: AccountService;
  userProfileUpdatedMessageHidden:boolean;
  private transactionService : TransactionService
  private registrationService: RegistrationService;
  
  constructor(accountService: AccountService, route : ActivatedRoute, payeeService: PayeeService,
     transactionService: TransactionService, registrationService: RegistrationService) {
    
    this.route = route;
    this.payeeService = payeeService;
    this.accountService = accountService;
    this.transactionService = transactionService;
    this.registrationService = registrationService;
   }

  ngOnInit(): void {

    this.accountId = this.route.snapshot.params['id'];
    this.fetchAccountDetails(this.accountId);
    this.registerPayeeFLow = false;
    this.isPayeeSelected = false;
    this.userProfile = new RegistrationRequest();
  }

  fetchAccountDetails(accountId: number){
    this.accountService.fetchAccountDetails(this.accountId, 6).subscribe((accountResponse :AccountResponse)=>{
      
      for(var transaction of accountResponse.transactions){
        transaction.transactionDate = transaction.transactionDate.slice(0,10);
      }
      this.accountResponse =  accountResponse;
    },(error=>console.log('Error in Fetch Account Api')));
  }


  tabClick(event: MatTabChangeEvent){
    let tabLabel: string = event.tab.textLabel;
    switch(tabLabel){
      case 'Transfer Funds':{
        this.fetchAllPayees();
        break;
      }
      case 'Profile':{
        this.userProfileUpdatedMessageHidden = true;
        this.fetchProfileDetails();
        break;
      }
      default:{
      }
    }
  }

  fetchProfileDetails(){
    this.registrationService.retrieveUser(this.accountResponse.loginId).subscribe((registrationRequest: RegistrationRequest)=>{
        this.userProfile = registrationRequest;
    },(error)=>console.log('Error in Calling Get Profile Api'));
  }

  updateUserProfile(updateUserProfileForm: NgForm){

    let updateUserProfileRequest:RegistrationRequest = {
        firstname: updateUserProfileForm.value.firstname,
        lastname: updateUserProfileForm.value.lastname,
        address: updateUserProfileForm.value.address,
        pancard: updateUserProfileForm.value.pancard,
        mobile: updateUserProfileForm.value.mobile,
        dateOfBirth: updateUserProfileForm.value.dateOfBirth,
        registrationId: updateUserProfileForm.value.registrationId
    };

    console.log(updateUserProfileForm.value.dateOfBirth);

    this.registrationService.updateUser(updateUserProfileRequest).subscribe((registrationResponse: RegistrationResponse)=>{
        if(registrationResponse.status == 'success' && registrationResponse.registrationId == updateUserProfileForm.value.registrationId){
          this.accountResponse.customerName = updateUserProfileForm.value.firstname + ' ' + updateUserProfileForm.value.lastname;
          this.userProfileUpdatedMessageHidden = false;
          setTimeout(()=> {
            this.userProfileUpdatedMessageHidden = true}, 3000);
        }
    },(error)=>console.log('Error in Calling Update Profile Api'));
  }

  fetchAllPayees(){
    this.payeeService.fetchAllPayees(this.accountId).subscribe((payeeResponse: PayeeResponse)=>{
      this.payeeResponse = payeeResponse;
    },(error)=>console.log('Error Calling Fetch Payee Information Api'));
  }

  payeeSelected(event: any){
    this.isPayeeSelected = true;
    this.selectedPayeeId = event.value;
  }

  addPayee(value:boolean){
    this.registerPayeeFLow = value;
  }

  registerPayee(registerPayeeForm: NgForm){

    if(registerPayeeForm.invalid){
      return;
    }

    this.payeeService.registerPayee(this.accountId, registerPayeeForm.value.payeeName,
      registerPayeeForm.value.payeeAccountNo).subscribe((addPayeeResponse: GenericResponse)=>{
           if(addPayeeResponse.status == 'success'){
             this.fetchAllPayees();
             this.addPayee(false);
           }
      },(error)=>console.log('Error Calling Register Payee Api'));
  }

  transferFunds(transferFundForm: NgForm){
    if(transferFundForm.invalid){
      return;
    }

    this.inSuffucientFundsMessage = '';
    const transferRequest: TransferRequest = {
      remarks : transferFundForm.value.remarks,
      recipientAccountId : this.selectedPayeeId,
      transferAmount : transferFundForm.value.amount
    };

    this.transactionService.transferFunds(transferRequest, this.accountId).subscribe((transferResponse: TransferResponse)=>{
      if(transferResponse.status == 'success' && transferResponse.transactionId > 0){
          this.fetchAccountDetails(this.accountId);
      }if(transferResponse.failureReason == 'Insufficient Funds'){
        this.inSuffucientFundsMessage = transferResponse.failureReason;
      }
    },(error)=>console.log('Error In Calling Trasnfer Funds Api'));
  }
}
