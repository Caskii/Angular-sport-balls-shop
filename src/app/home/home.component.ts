import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    //this.authService.user$.pipe(switchMap((user:any)=>this.userService.get(user.uid))).pipe(map((appuser:any) => (appuser.isAdmin==true)));
  }
  

}
