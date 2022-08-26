import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(public http: HttpClient) { }

  saveVacation(data: FormData): Observable<any> {
    const url = `${environment.api}/vacation/save/`;
    return this.http.post(url, data);
  }

  getVacations(email: any): Observable<any> {
    const url = `${environment.api}/vacation/get/${email}/`;
    return this.http.get(url);
  }

  getAllVacationRequests(): Observable<any> {
    const url = `${environment.api}/vacation/list/`;
    return this.http.get(url);
  }

  updateStatus(data:any): Observable<any> {
    const url = `${environment.api}/vacation/update-status/`;
    return this.http.put(url, data);
  }
  
  deleteRequest(id:any) {
    const url = `${environment.api}/vacation/delete/${id}`;
    return this.http.delete(url);
  }
}
