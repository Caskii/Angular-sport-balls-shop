import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService :AuthService,private userService:UserService, private router:Router){
    authService.user$.subscribe(user =>{
      if (user){
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        localStorage.removeItem('returnUrl');
        if(returnUrl) this.router.navigate([returnUrl]);
      }
    });
  }
}
