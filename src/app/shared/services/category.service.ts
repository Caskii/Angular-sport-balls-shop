import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getall(){
    return this.db.list('/categories').snapshotChanges().pipe(map(actions => {
      return actions.map(p => {
        const key = p.payload.key;
        const data = p.payload.val();
        return {key,data};
      });
     }));
  }
}
