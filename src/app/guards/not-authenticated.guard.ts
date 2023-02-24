import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): boolean {
    // only for not athenticated users
    if (!this.userService.isUserLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
