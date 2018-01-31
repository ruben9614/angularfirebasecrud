import { element } from 'protractor';
import { Employee } from './../shared/employee.model';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service'
import { AngularFireList } from 'angularfire2/database'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  //employeeList: AngularFireList<Employee>;
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element =>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      })
    });

  }

  onItemClick(emp: Employee){
    this.employeeService.selectedEmployee = Object.assign({},emp);
  }

}
