import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authData = {
    user1: {
      name: 'Admin',
      permission: 'all',
      password: 'Admin',
    },
    user2: {
      name: 'guest',
      permission: 'none',
      password: 'guest',
    },
  };

  constructor() {}

  checkLoginCredentials(credentials) {
    const { username, password } = credentials;
    let userFound = false;
    let currentUserRole = null;
    Object.entries(this.authData).forEach(([key, value]) => {
      if (value.name === username && value.password === password) {
        userFound = true;
        currentUserRole = value.permission;
      }
    });
    if (userFound) {
      return currentUserRole;
    }
  }
}