import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { VacationRequestComponent } from './vacation-request/vacation-request.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: 'vacation-request', component: VacationRequestComponent
  },
  {
    path: 'requests', component: RequestsListComponent
  },
  {
    path: 'add-employee', component: AddEmployeeComponent
  },

  {
    path: 'employees', component: EmployeesListComponent
  },
  {
    path: "", component: HomeComponent
  }
  // {
    // path: "signup", component: Signu
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
