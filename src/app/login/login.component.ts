import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SidenavService } from '../services/sidenav/sidenav.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UiService } from '../services/ui-service/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean = true;
  formGroup: FormGroup;

  constructor(
    public uiservice: UiService,
    public authService: AuthService, 
    public tokenStorage: TokenStorageService,
    public sidenavService: SidenavService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginSubmit() {
    console.log("Data submitted: ", this.formGroup.value)
  }

  loginUser() {
    const data = this.formGroup.value;
    if(!this.formGroup.valid) {
      return;
    }
    this.uiservice.triggerLoader(true);
    this.authService.login(data.username, data.password).subscribe(data => {
      this.uiservice.triggerLoader(false);
      this.isAuthenticated = true;
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      if(data.position === 'admin') {
        this.sidenavService.getAdminSidenav().subscribe((data:any) => {
          this.uiservice.triggerSideNav(data);
        });
      }
      else {
        this.sidenavService.getEmployeeSidenav().subscribe((data:any) => {
          this.uiservice.triggerSideNav(data);
        });
      }

      this.router.navigate(['/']);
      console.log("Response: ", data);
    }, error => {
      this.uiservice.triggerLoader(false);
      this.isAuthenticated = false;
      console.error(error);
    })
  }
}
