import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,private router:Router) { 
  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
