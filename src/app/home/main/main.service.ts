import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'src/app/shared/service/cookieService/cookie.service';
import Data from './main.interface';




@Injectable({
  providedIn: 'root'
})
export class MainService {

  public listData = new BehaviorSubject([])
  constructor(private cookieService: CookieService
  ) { }
  
  setListData(data) {
    console.log('setListData', data)
    this.cookieService.WriteCookie('listData', data)
    // this.WriteCookie('listData', data)
    this.listData.next(data)
  }

  getListData() {
    return this.listData.asObservable()
  }
   

//   WriteCookie(key, data) {
//     let now = new Date();
//     const minutes = 120;
//     now.setTime(now.getTime() + (minutes * 60 * 1000));
//     const cookieValue = JSON.stringify({[key] : data}) + ";"  
//     document.cookie =  key+'='+ cookieValue + ';expires='+now.toUTCString()+';path=/'   
//  }

//  getCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for(var i=0;i < ca.length;i++) {
//       var c = ca[i];
//       while (c.charAt(0)==' ') c = c.substring(1,c.length);
//       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//   }
//   return null;
// }

}
