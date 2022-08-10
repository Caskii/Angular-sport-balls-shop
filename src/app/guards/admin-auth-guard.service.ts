import { Injectable } from '@angular/core';
import {  CanActivate} from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService:AuthService, private userService:UserService) { }

  canActivate() {
    return this.authService.appUser$.pipe(map((appuser:any) => (appuser.isAdmin==true)))
  }
}
