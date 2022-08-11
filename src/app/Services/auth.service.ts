import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable,of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User| null>;
  constructor(private userService:UserService,private auth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$=auth.user;
   }

  login(){
    let returnUrl = this .route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }
  logout(){
    this.auth.signOut();
  }
  get appUser$(): Observable<AppUser| unknown> {
    return this.user$.pipe(switchMap((user:any)=>{
      if (user) return this.userService.get(user.uid)
      return of(null);
    }));
  }
}
