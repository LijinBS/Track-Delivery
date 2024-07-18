import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from '../shared/service/cookieService/cookie.service';
import { MainService } from './main/main.service';
const tableData = [
  {
    id: 0,
    refId: 123456,
    vehicle: 'E-scooter',
    address: 'Malerwag 2 1678 Himmelpfort',
    name: 'Hannelmore Amsel',
    subTable: [{ location: 'Himmelpfort', time: '4.53 PM', comment: 'NA' }],
  },
  {
    id: 1,
    refId: 654321,
    vehicle: 'Bike',
    address: 'Adelwag 13 1678 Himmelpfort',
    name: 'Horst HurtZig',
    subTable: [{ location: 'Himmelpfort', time: '4.53 PM', comment: 'NA' }],
  },
  {
    id: 2,
    refId: 332148,
    vehicle: 'E-scooter',
    address: 'Haupstr 178a 1678 Himmelpfort',
    name: 'Annalena Lang',
    subTable: [{ location: 'Himmelpfort', time: '4.53 PM', comment: 'NA' }],
  },
  {
    id: 3,
    refId: 987654,
    vehicle: 'Bike',
    address: 'langestr 1 1678 Himmelpfort',
    name: 'Minn Leh Nhygen',
    subTable: [{ location: 'Himmelpfort', time: '4.53 PM', comment: 'NA' }],
  },
  {
    id: 4,
    refId: 975361,
    vehicle: 'Caddy',
    address: 'Breitte str 3e 1678 Himmelpfort',
    name: 'Karl Gans',
    subTable: [{ location: 'Himmelpfort', time: '4.53 PM', comment: 'NA' }],
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isCollapsed: boolean;
  private subscriptions: Subscription;
  public roleData: any;
  public breadcrumbArray: string[];
  constructor(private router: Router, private mainService: MainService, private cookieService: CookieService) {
    this.subscriptions = new Subscription();
    this.isCollapsed = false;
    this.breadcrumbArray = ['home', 'main'];
  }

  ngOnInit(): void {
    const cookieData = this.cookieService.getCookie('listData');
    const roleData = this.cookieService.getCookie('user')
    if (cookieData) {
      const parsedData = JSON.parse(cookieData)
      this.mainService.setListData(parsedData.listData)
    } else {
      this.mainService.setListData(tableData)
    }
    if(roleData) {
      this.roleData = JSON.parse(roleData)
    }
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const { urlAfterRedirects } = event;
        const querySplit = urlAfterRedirects.split('?');
        const urlArray = querySplit[0].split('/');
        urlArray.splice(0, 1);
        this.breadcrumbArray = urlArray;
      }
    });
  }

  logout() {
    console.log('logout clicked')
   
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
