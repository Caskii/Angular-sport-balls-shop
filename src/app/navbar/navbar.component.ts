import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean = true;
  appUser: AppUser | undefined;
  constructor(public authService: AuthService,private router:Router) { 
  }
  ngOnInit(): void {
    this.authService.appUser$.subscribe((appuser:any) => this.appUser=appuser);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
