import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean = true;
  appUser: AppUser | undefined;
  cart$:Observable<ShoppingCart> | undefined;

  constructor(
    private authService: AuthService,
    private shoppingCartService:ShoppingCartService,
    private router:Router) { }
  async ngOnInit() {
    this.authService.appUser$.subscribe((appuser:any) => this.appUser=appuser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
