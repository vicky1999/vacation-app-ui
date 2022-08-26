import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UiService } from '../services/ui-service/ui.service';
import { UserService } from '../services/user/user.service';

import {
  ColDef,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { NotificationService } from '../services/notification/notification.service';
import { BtnCellRenderer } from '../utils/button-cell-renderer.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  user:any;
  rowData: any;
  columnDefs: any[];
  isAdmin: boolean;
  defaultColDefs: ColDef;
  isUpdated: boolean;

  updatedData: any[];

  constructor(
    public router: Router,
    public tokenService: TokenStorageService,
    public uiService: UiService,
    public userService: UserService,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isUpdated = false;
    this.user = this.tokenService.getUser();
    this.isAdmin = this.user.position.toLowerCase() === 'admin';
    this.updatedData = [];
    
    if(!this.user || !this.isAdmin) {
      this.router.navigate(['/login'])
    }
    this.uiService.triggerLoader(true);
    this.columnDefs = [
      {
        headerName: "ID",
        field: 'id',
      },
      {
        headerName: "Name",
        field: 'name',
        editable: true
      },
      {
        headerName: "Email",
        field: 'email'
      },
      {
        headerName: "Description",
        field: 'description',
        editable: true
      },
      {
        headerName: "Position",
        field: 'position',
        editable: true
      },
      {
        headerName: "Hiring Date",
        field: 'hiring_date',
      },
      {
        field: 'Delete',
        cellRenderer: BtnCellRenderer,
        cellRendererParams: {
          clicked: (field: any) => {
            this.deleteEmployee(field)
          }
        },
      }
    ];
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.userService.getAllEmployees().subscribe((data:any) => {
      this.uiService.triggerLoader(false);
      this.rowData = data.users;
      console.log(data);
    }, err => {
      this.uiService.triggerLoader(false);
      console.log("Error: ", err);
    })
  }
  
  gridUpdated(event:any) {
    const data = event.data;
    this.isUpdated = true;
    
    let updatedRow = event.data;
    let ind = this.updatedData.findIndex(req => req.id === updatedRow.id)
    if(ind === -1) {
      this.updatedData.push(updatedRow);
    } else {
      this.updatedData[ind] = updatedRow;
    }
  }

  updateEmployeeDetails() {
    console.log("Details: ", this.updatedData);

    this.uiService.triggerLoader(true);
    this.userService.updateEmployees(this.updatedData).subscribe(data => {
      this.uiService.triggerLoader(false);
      this.isUpdated = false;
      this.notificationService.showSuccessToast("Employees Details Updated Successfully");
    }, err => {
      this.uiService.triggerLoader(false);
      this.notificationService.showErrorToast(err.status === 400 ? err.error.error : "Error while Update Employees details");
    })
  }

  deleteEmployee(id:any) {
    this.uiService.triggerLoader(true);
    this.userService.deleteEmployee(id).subscribe(data => {
      this.getEmployeesList();
      console.log(this.rowData);
      this.uiService.triggerLoader(false);
      this.isUpdated = false;
      this.notificationService.showSuccessToast("Employee Deleted Successfully");
    }, (err: any) => {
      this.uiService.triggerLoader(false);
      this.notificationService.showErrorToast(err.status === 400 ? err.error.error : "Error while Update Employees details");
    })
  }

}
