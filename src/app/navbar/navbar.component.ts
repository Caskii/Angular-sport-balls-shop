import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { AuthService } from '../Services/auth.service';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean = true;
  appUser: AppUser | undefined;
  shoppingCartnumberOfItems: number=0;

  constructor(
    private authService: AuthService,
    private shoppingCartService:ShoppingCartService,
    private router:Router) { }
  async ngOnInit() {
    this.authService.appUser$.subscribe((appuser:any) => this.appUser=appuser);
    (await this.shoppingCartService.getTotalNumberOfProduct()).subscribe(tot=>this.shoppingCartnumberOfItems=tot);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
