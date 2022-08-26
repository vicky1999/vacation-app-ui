import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token/token-storage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  user: any;
  constructor(
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

}
