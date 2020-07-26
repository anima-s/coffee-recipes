import { Injectable } from '@angular/core';
import { DbService } from './db.service';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  Data: any[] = []

  constructor(private db: DbService) { }

  getUsersFromDB() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchUsers().subscribe(item => {
          this.Data = item
          console.log(item)
          // console.log(this.Data)
        })
      }
    });
  }
}
