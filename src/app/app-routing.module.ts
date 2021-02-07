import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';
const appRouters: Routes = [
  {path :'', component: LoginComponent},
  {path :'login', component : LoginComponent},
  {path :'registration', component : RegistrationComponent},
  {path :'account/:id', component : AccountComponent},
  {path:'account/profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule]
})
export class AppRoutingModule { }