import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private  loginService: LoginService;
  private router: Router;
  status:string;
  hide:any;

  constructor(loginService:LoginService, router: Router) {
    this.loginService = loginService;
    this.router  =router;
   }

  ngOnInit(): void {
    this.hide = true
    this.status = '';
  }

  onFormSubmit(loginForm: NgForm){
    if(loginForm.invalid){
      return;
    }

    const loginRequest: LoginRequest = {
      username:loginForm.value.username,
      password:loginForm.value.password
    };
    
   this.loginService.checkCredentials(loginRequest).subscribe((loginResponse: LoginResponse)=>{
     if(loginResponse.status =='failed'){
       this.status = 'username - password combination mismatch';
     }else{
       this.router.navigate(['/account',loginResponse.accountId]);
     }
   },(error)=>this.status ='Error In Calling Api');
  }

  resetForm(loginForm: NgForm){
    loginForm.reset();
    this.status ='';
  }

  registerUser(){
    this.router.navigate(['/registration']);
  }

}
