import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token/token-storage.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {
  user:any;
  constructor(public tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    console.log(this.user);
  }

}
