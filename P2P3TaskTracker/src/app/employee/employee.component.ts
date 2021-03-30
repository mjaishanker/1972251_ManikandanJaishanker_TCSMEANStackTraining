import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { EmployeeTasks } from '../empTaskTracker.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empTasksTrack:Array<EmployeeTasks> = [];

  constructor(public empSer:EmployeeServiceService) { }

  ngOnInit(): void {
    this.empSer.retrieveEmployee().subscribe(result=>this.empTasksTrack=result);
  }

  storeUser(empRef:any){
    console.log(empRef);
    this.empSer.storeEmployee(empRef);
  }
}
