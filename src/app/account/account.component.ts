import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountResponse } from '../models/account-response.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountId: number;
  private route:ActivatedRoute;
  private router : Router;
  accountResponse : AccountResponse;
  private accountService: AccountService

  constructor(accountService: AccountService, router : Router,route:ActivatedRoute) {
    this.route=route;
    this.router = router;
    this.accountService = accountService;
   }

  ngOnInit(): void {

    this.accountId = this.route.snapshot.params['id'];
    this.fetchAccountDetails(this.accountId);
  }

  fetchAccountDetails(accountId: number){
    this.accountService.fetchAccountDetails(this.accountId, 6).subscribe((accountResponse :AccountResponse)=>{
      this.accountResponse =  accountResponse;
    },(error=>console.log('Error in Calling Api')));
  }
  profileData()
  {
    this.router.navigate(['/account/profile']);
  }
}
