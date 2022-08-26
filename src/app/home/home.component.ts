import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(public tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    console.log(this.user);
  }

}
