import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RegistrationRequest } from '../models/registration-request.model';
import { RegistrationResponse } from '../models/registration-response.model';
import { RegistrationService } from '../services/registration.service';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private registrationService: RegistrationService;
  private loginService: LoginService;
  continueRegistration:any;
  registrationId:number;
  status:any;
  private router: Router;
  hide:any

  constructor(registrationService: RegistrationService,
   loginService: LoginService, router: Router) {
    this.registrationService = registrationService;
    this.loginService = loginService;
    this.router = router;
   }

  ngOnInit(): void {
   if(this.registrationId !=0){
    this.continueRegistration = false;
    }
    this.hide = true;
  }

  registerUser(registerForm: NgForm){

    if(registerForm.invalid){
      return;
    }
    const registrationRequest :RegistrationRequest= {

        firstname:registerForm.value.firstname,
        lastname:registerForm.value.lastname,
        address:registerForm.value.address,
        dateOfBirth:new DatePipe('en').transform(registerForm.value.dateOfBirth, 'MM/dd/YYYY'),
        mobile:registerForm.value.mobile,
        pancard:registerForm.value.pancard,
        registrationId:0
    };
    
    this.registrationService.registerUser(registrationRequest).subscribe((registrationResponse: RegistrationResponse)=>{
        if(registrationResponse.status == 'success' && registrationResponse.registrationId > 0){
              this.continueRegistration = true;
              this.registrationId = registrationResponse.registrationId;
        }else{
          this.status = 'Registration Failed';
        }
    },(error)=>console.log('Error in Calling Api'));
  }


  completeRegistration(completeRegistrationForm: NgForm){

    if(completeRegistrationForm.invalid){
      return;
    }

    const loginRequest: LoginRequest = {
      username: completeRegistrationForm.value.username,
      password: completeRegistrationForm.value.password
    }

    this.loginService.addCredentials(loginRequest, this.registrationId).subscribe(
      (completeRegistrationResponse:LoginResponse)=>{
       if(completeRegistrationResponse.status == 'duplicate'){
          this.status = "username already taken"
       }else if(completeRegistrationResponse.status =='success') {
          this.router.navigate(['/login']);  
       }else{
         this.status = "Registartion Failed";
       }
       console.log(completeRegistrationResponse.status);
    },(error)=>console.log('Error In Calling Api'));
  }

  resetRegistrationForm(completeRegistrationForm: NgForm){
    completeRegistrationForm.reset();
  }

}
