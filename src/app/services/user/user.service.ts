import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getAllEmployees() {
    const url = `${environment.api}/user/list/`;
    return this.http.get(url);
  }

  saveEmployee(data:any) {
    const url = `${environment.api}/user/register/`;
    return this.http.post(url, data);
  }

  updateEmployees(data: any) {
    const url = `${environment.api}/user/update/`;
    return this.http.put(url, data);
  }

  deleteEmployee(id:any) {
    const url = `${environment.api}/user/delete/${id}`;
    return this.http.delete(url);
  }

}
