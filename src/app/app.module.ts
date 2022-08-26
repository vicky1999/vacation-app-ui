import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { VacationRequestComponent } from './vacation-request/vacation-request.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BtnCellRenderer } from './utils/button-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeHomeComponent,
    AdminHomeComponent,
    HomeComponent,
    VacationRequestComponent,
    FileUploaderComponent,
    RequestsListComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    BtnCellRenderer
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
