import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [

  // {
  //   path: "\login",
  //   component: LoginPageComponent,
  //   children: [
  //     {path:"\portfolio", component:PortfolioPageComponent},
  //     {path:"\signup", component:SignupPageComponent}
  //   ]
  // },
  {path:"\login", component:LoginPageComponent},
  {path:"\portfolio", component:PortfolioPageComponent},
  {path:"\signup", component:SignupPageComponent},
  {path:"", redirectTo:"\login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
