import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UiService } from '../services/ui-service/ui.service';
import { VacationService } from '../services/vacation/vacation.service';
import { BtnCellRenderer } from '../utils/button-cell-renderer.component';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  user: any;
  rowData: any;
  columnDefs: any[];
  isAdmin: boolean;
  defaultColDefs: ColDef;
  isUpdated: boolean;
  updatedRequests: any[] = [];

  @Input() displayDetails: boolean;

  constructor(
    public router: Router,
    public vacationService: VacationService,
    public uiService: UiService,
    public tokenService: TokenStorageService,
    public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.isUpdated = false;
    this.user = this.tokenService.getUser();
    this.isAdmin = this.user.position.toLowerCase() === 'admin';
    if(!this.user) {
      this.router.navigate(['/login'])
    }
    console.log(this.user);
    this.uiService.triggerLoader(true);
    this.columnDefs = [
      {
        headerName: "ID",
        field: 'id',
      },
      {
        headerName: "Start Date",
        field: 'start_date',
      },
      {
        headerName: "End Date",
        field: 'end_date',
      },
      {
        headerName: "Reason",
        field: 'reason',
      }
    ];
    if(this.isAdmin) {
      this.columnDefs.push({
        field: 'status',
        headerName: "Status",
        editable: (this.isAdmin && this.displayDetails),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['PENDING', 'REJECTED', 'APPROVED'],
        }
      })      
    }
    else {
      this.columnDefs.push({
        field: 'status',
        headerName: "Status"
      })
    }
    this.columnDefs.push({
      headerName: 'Requested By',
      field: 'emp_email'
    })

    this.columnDefs.push({
        field: 'Delete',
        cellRenderer: BtnCellRenderer,
        cellRendererParams: {
          clicked: (field: any) => {
            this.deleteVacationRequest(field)
          }
        },
      })
    this.defaultColDefs = {
      sortable: true,
      filter: true,
    }
    this.getVacations(this.user.email)
  }

  getAllVacations() {
      this.vacationService.getAllVacationRequests().subscribe(data => {
        this.uiService.triggerLoader(false);
        this.rowData = data.data;
        console.log(data);
      }, err => {
        this.uiService.triggerLoader(false);
        console.log("Error: ", err);
      })
  }

  getVacations(email: any) {
    if(this.isAdmin) {
      this.getAllVacations();
    }
    else {
      this.vacationService.getVacations(email).subscribe(data => {
        this.uiService.triggerLoader(false);
        this.rowData = data.data;
        console.log(data);
      }, err => {
        this.uiService.triggerLoader(false);
        console.log("Error: ", err);
      })
    }
  }

  gridUpdated(event: any) {
    console.log("Grid Update: ", event);
    this.isUpdated = true;
    let updatedRow = event.data;
    let ind = this.updatedRequests.findIndex(req => req.id === updatedRow.id)
    if(ind === -1) {
      this.updatedRequests.push({
        id: updatedRow.id,
        status: updatedRow.status
      })
    } else {
      this.updatedRequests[ind].status = updatedRow.status;
    }
  }

  updateVacationRequests() {
    console.log("Update Request: ", this.updatedRequests);
    this.uiService.triggerLoader(true);
    this.vacationService.updateStatus(this.updatedRequests).subscribe((data:any) => {
      this.isUpdated = false;
      this.uiService.triggerLoader(true);
      this.notificationService.showSuccessToast("Details Updated successfully");
      this.uiService.triggerLoader(false);
      console.log("Data: ", data);
    }, (err:any) => {
      this.uiService.triggerLoader(false);
      if(err.status === 400) {
        this.notificationService.showErrorToast(err.error.error)
      } else {
        this.notificationService.showErrorToast("Error in updating vacation requests")
      }
    })
  }


  deleteVacationRequest(id:any) {
    this.uiService.triggerLoader(true);
    this.vacationService.deleteRequest(id).subscribe(data => {
      this.getAllVacations();
      console.log(this.rowData);
      this.uiService.triggerLoader(false);
      this.isUpdated = false;
      this.notificationService.showSuccessToast("Vacation Request Deleted Successfully");
    }, (err: any) => {
      this.uiService.triggerLoader(false);
      this.notificationService.showErrorToast(err.status === 400 ? err.error.error : "Error while Update Employees details");
    })
  }

}
