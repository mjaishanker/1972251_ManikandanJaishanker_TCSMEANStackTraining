import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfo } from './ListOfUsers';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    PortfolioPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserInfo],
  bootstrap: [AppComponent]
})
export class AppModule { }
