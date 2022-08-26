import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(public http: HttpClient) { }

  getEmployeeSidenav() {
    return this.http.get('/assets/sidenav/employee.json');
  }
  getAdminSidenav() {
    return this.http.get('/assets/sidenav/admin.json');
  }
}
