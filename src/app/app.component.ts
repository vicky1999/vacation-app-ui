import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavService } from './services/sidenav/sidenav.service';
import { TokenStorageService } from './services/token/token-storage.service';
import { UiService } from './services/ui-service/ui.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') public sideNav:MatSidenav;

  title = 'maid-app-web';
  isLoading: boolean = false;
  navMenu: any[] = [];
  showHeader: boolean = true;
  noHeaderPages: string[] = ['/login', '/signup'];
  isMobile: boolean = false;
  isSidenavOpened: boolean = false;
  isSubmenuOpened: boolean = false;

  submenuData: any;

  constructor(
    public router: Router, 
    public uiservice: UiService,
    public sidenavService: SidenavService,
    public tokenService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isMobile = document.body.offsetWidth <= 600;
    this.setSideNav();

    this.uiservice.receiveSideNav().subscribe(data => {
      this.navMenu = data;
    })


    this.uiservice.receiveLoader().subscribe(data => {
      this.isLoading = data;
    },
    error => {
      this.uiservice.triggerLoader(false);
    })
  }

  setSideNav() {
    const user = this.tokenService.getUser()
    if(user.position.toLowerCase() === 'admin') {
      this.sidenavService.getAdminSidenav().subscribe((data:any) => {
        this.uiservice.triggerSideNav(data);
      })
    } else {
      this.sidenavService.getEmployeeSidenav().subscribe((data:any) => {
        this.uiservice.triggerSideNav(data);
      })
    }
  }

  navigateRoute(event:any) {
    this.showHeader = true;
    this.sideNav.close();
    if(event && event.router && this.noHeaderPages.findIndex(url => url===event.router.url) !== -1) {
      this.showHeader = false;
    }
  }

  toggleSidenav() {
    const submenu = document.getElementById("sidenav-submenu") as HTMLElement;
    const sidenav = document.getElementById("sidenav") as HTMLElement;
    sidenav.style.borderRadius = "0px 20px 20px 0px";
    if(this.isSubmenuOpened) {
      this.isSubmenuOpened = !this.isSubmenuOpened;
      submenu.style.width = "0px";
    }
    else {
      this.isSidenavOpened = !this.isSidenavOpened;
    }
  }

  toggleSubmenu(menus: any) {
    const submenu = document.getElementById("sidenav-submenu");
    const sidenav = document.getElementById("sidenav");
    this.submenuData = menus;
    if(submenu) {
        submenu.style.width = "250px";
        this.isSubmenuOpened = true;
        if(sidenav) {
          sidenav.style.borderRadius = "0px";
        }
    }
  }

}
