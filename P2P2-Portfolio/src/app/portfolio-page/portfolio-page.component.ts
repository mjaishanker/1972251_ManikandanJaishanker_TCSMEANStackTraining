import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo } from '../ListOfUsers';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {


  contactDetails = new FormGroup({
    friendName: new FormControl(),
    phoneNumber: new FormControl(),
  });

  constructor(public router: Router, public service:UserInfo) { }

  signedInUser = new UserInfo();

  ngOnInit(): void {

    const obj = JSON.parse(sessionStorage.getItem('signedInUserInfo') || '{}');
    this.signedInUser = obj;
    
    document.getElementById('displayUserName')!.innerText = this.signedInUser.userName;


  }

  regContact(){
    //console.log(this.contactDetails.get("friendName")?.value);
    //console.log(this.contactDetails.get("phoneNumber")?.value);

    if(this.contactDetails.get("friendName")?.value != null && this.contactDetails.get("phoneNumber")?.value != null){
      let table = document.getElementById('userFriendDetails');
      let tableBody = table?.getElementsByTagName("tbody")[0];
      let newRow = tableBody?.insertRow(tableBody.rows.length);

      let cell1 = newRow?.insertCell(0);
      cell1?.setAttribute('scope', 'row');
      cell1!.innerHTML = this.contactDetails.get("friendName")?.value;

      let cell2 = newRow?.insertCell(1);
      cell2?.setAttribute('scope', 'row');
      cell2!.innerHTML = this.contactDetails.get("phoneNumber")?.value;
    }
    else{
      alert("Please Enter All Text Fields!");
      return;
    }
  }

  loginPage(){
    this.router.navigate(["login"]);
  }

}
