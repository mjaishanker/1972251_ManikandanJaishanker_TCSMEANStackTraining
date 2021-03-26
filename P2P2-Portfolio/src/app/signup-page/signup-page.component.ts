import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo } from '../ListOfUsers';

// class UserProfile{
//   firstName: string = "";
//   lastName: string = "";
//   userName: string = "";
//   password: string = "";
// }


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  signUpRef = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    uname: new FormControl(),
    pword: new FormControl()
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

  loginPage(){
    this.router.navigate(["login"]);
  }

  signUpUser(){
    
    if(this.signUpRef.get("firstname")?.value != null && this.signUpRef.get("lastname")?.value != null && this.signUpRef.get("uname")?.value != null && this.signUpRef.get("pword")?.value != null){
      let newUser = new UserInfo();
      newUser.firstName = this.signUpRef.get("firstname")?.value;
      newUser.lastName = this.signUpRef.get("lastname")?.value;
      newUser.userName = this.signUpRef.get("uname")?.value;
      newUser.password = this.signUpRef.get("pword")?.value;

      if(this.listOfUsers.some(person => person.userName === newUser.userName)){
        alert("Username Already Exists");
        return;
      }
      else{

        this.listOfUsers.push(newUser);
        sessionStorage.setItem("listOfUsersInfo",JSON.stringify(this.listOfUsers));
        //console.log("User that just got pushed");
        //console.log(this.listOfUsers);
        alert("Sucessfully Signed Up!")
        this.router.navigate(["login"]);
      }
    }

    else{
      alert("Please Enter All Text Fields!");
      return;
    }

  }

}
