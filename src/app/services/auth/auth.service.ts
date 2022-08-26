import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const formDataHeader = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json;',
    "Accept": "*/*" ,
    "Access-Control-Allow-Origin":  "*"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.api}/user/login/`;
    return this.http.post(url, { email, password }, httpOptions);
  }

  signup(username: string, email: string, password: string): Observable<any> {
    const url = `${environment.api}/api/auth/signup/`;
    return this.http.post(url, { username, email, password }, httpOptions);
  }

  supplierSignup(userDetails: FormData) {
    const url = `${environment.api}/api/auth/signup/supplier`;
    return this.http.post(url, userDetails, formDataHeader);
  }

  testAPI() {
    const url = `${environment.api}/api/test/organizer`;
    return this.http.get(url, { responseType: 'text' });
  }

}
