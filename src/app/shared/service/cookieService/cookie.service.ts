import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  WriteCookie(key, data) {
    let now = new Date();
    const minutes = 120;
    now.setTime(now.getTime() + (minutes * 60 * 1000));
    const cookieValue = JSON.stringify({[key] : data}) + ";"  
    document.cookie =  key+'='+ cookieValue + ';expires='+now.toUTCString()+';path=/'   
 }

 getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

removeCookie() {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "listData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

}
