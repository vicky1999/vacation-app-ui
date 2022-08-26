import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification/notification.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UiService } from '../services/ui-service/ui.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    public datepipe: DatePipe,
    public uiService: UiService,
    public notificationService: NotificationService,
    public tokenService: TokenStorageService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.validatePassword.bind(this)]),
      position: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      hiring_date: new FormControl('', [Validators.required]),
    });
  }

  validatePassword(fieldControl: FormControl) {
    return fieldControl.value === this.formGroup?.get("password")?.value ? null : {
        mismatch: true
    };
  }


  addEmployee() {
    if(!this.formGroup.valid) {
      return;
    }
    this.uiService.triggerLoader(true);
    const data = this.formGroup.value;
    data.hiring_date = this.getDateString(data.hiring_date);
    this.userService.saveEmployee(data).subscribe((data:any) => {
      this.uiService.triggerLoader(false);
      this.notificationService.showSuccessToast("Employee Created Successfully");
    }, (err:any) => {
      this.uiService.triggerLoader(false);
      this.notificationService.showErrorToast(err.status === 400 ? err.error.error : "Error while Creating Employee");
    })
  }

  getDateString(date:string) {
    const latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    if(!latest_date) return '';
    return latest_date;
  }

}
