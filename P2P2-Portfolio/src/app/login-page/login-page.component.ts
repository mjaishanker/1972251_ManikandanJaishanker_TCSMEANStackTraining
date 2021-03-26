import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserInfo } from '../ListOfUsers';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})

export class LoginPageComponent implements OnInit {

  signInInfo = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()
  });

  constructor(public router: Router, public service:UserInfo) { }

  listOfUsers: UserInfo[] = [];

  ngOnInit(): void {
    if(this.listOfUsers != null){
      //console.log("On Init the List of Stored Users Are: ");
      //console.log(this.listOfUsers);
      const obj = JSON.parse(sessionStorage.getItem('listOfUsersInfo') || '{}');
      if(obj != null){
        for(let x in obj){
            this.listOfUsers.push(obj[x]);
        }
      }
      //console.log("On Init the List of Stored Users Are AFTER PUSHING: ");
      //console.log(this.listOfUsers);
    }
  }

  signUpPage(){
    this.router.navigate(["signup"]);
  }

  logInUser(){

    let oldUser = new UserInfo();
    oldUser.userName = this.signInInfo.get("user")?.value;
    oldUser.password = this.signInInfo.get("pass")?.value;

    //console.log(oldUser.userName);
    //console.log(oldUser.password);

    let returningUser = this.listOfUsers.filter(function(item) {
      return (item.userName === oldUser.userName);
      })[0];
    
    if(returningUser.password == oldUser.password){
      //console.log("Loging In User");
      let itemUser = this.listOfUsers.filter(function(item) {
        return ((item.userName === oldUser.userName) && (item.password === oldUser.password));
        })[0];
  
        sessionStorage.setItem("signedInUserInfo",JSON.stringify(itemUser));

      this.router.navigate(["portfolio"]);
    }
    else{
      alert("Incorrect Credentials");
      return;
    }

  }
  
}
