// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  usersList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  table_name = "test_db.db";


  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'test_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchUsers(): Observable<User[]> {
    return this.usersList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'db/user_table.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getUsers();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }


  
  // Get list
  getUsers() {
    return this.storage.executeSql('SELECT * FROM users', []).then(res => {
      let items: User[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).user_id,
            name: res.rows.item(i).name,
          });
        }
      }
      this.usersList.next(items);
    });
  }


  // // Get single object
  // getSong(id): Promise<Song> {
  //   return this.storage.executeSql('SELECT * FROM users WHERE id = ?', [id]).then(res => {
  //     return {
  //       id: res.rows.item(0).id,
  //       artist_name: res.rows.item(0).artist_name,
  //       song_name: res.rows.item(0).song_name
  //     }
  //   });
  // }

  
}
