import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeTasks } from './empTaskTracker.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(public http:HttpClient) { }

  storeEmployee(loginTasks:any){
    this.http.post("http://localhost:3000/empTasks", loginTasks).subscribe(result=>console.log(result), error=>console.error(error));
  }

  retrieveEmployee():Observable<EmployeeTasks[]>{
    return this.http.get<EmployeeTasks[]>("http://localhost:3000/empTasks");
  }

}
