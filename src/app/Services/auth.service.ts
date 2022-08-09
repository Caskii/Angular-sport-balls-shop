import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User| null>;
  constructor(private auth: AngularFireAuth) {
    this.user$=auth.user;
   }

  login(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }
  logout(){
    this.auth.signOut();
  }
}
