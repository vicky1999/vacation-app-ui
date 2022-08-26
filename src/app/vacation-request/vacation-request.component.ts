import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification/notification.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UiService } from '../services/ui-service/ui.service';
import { VacationService } from '../services/vacation/vacation.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit {

  formGroup: FormGroup
  file: File;

  constructor(
    public router: Router,
    public datepipe: DatePipe,
    public vacationService: VacationService,
    public uiService: UiService,
    public notificationService: NotificationService, 
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });
  }

  addVacationRequest() {
    const user = this.tokenService.getUser();
    console.log("user: ", user);
    if(!this.formGroup.valid) {
      return;
    }
    if(!user) {
      this.router.navigate(['/login']);
    }
    if(!this.file) {
      this.notificationService.showErrorToast("File is Required");
      return
    }
    const form  = new FormData();
    const values = this.formGroup.value;
    form.append('startDate', this.getDateString(values.startDate));
    form.append('endDate', this.getDateString(values.startDate));
    form.append('reason', values.reason);
    form.append('file', this.file);
    form.append('emp_email', user.email)

    this.uiService.triggerLoader(true);
    this.vacationService.saveVacation(form).subscribe(data => {
      this.uiService.triggerLoader(false);
      this.notificationService.showSuccessToast("Request Saved Successfully");
    }, err => {
      this.uiService.triggerLoader(false);
      console.log("Error: ", err);
      if(err.status === 400) {
        this.notificationService.showErrorToast(err.error.error);
      } else{
        this.notificationService.showErrorToast("Error in saving Request")
      }
    })

  }

  getDateString(date:string) {
    const latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    if(!latest_date) return '';
    return latest_date;
  }

  fileUploaded(event:any) {
    console.log("Logo upload event: ", event);
    this.file = event[0];
  }

}
