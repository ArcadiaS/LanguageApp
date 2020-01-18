import { EnvService } from './env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { User } from '../models/user/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
    private env: EnvService) { }

  isLoggedIn = new BehaviorSubject(false);
  token:any;

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'oauth/token',
      {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'asdas',
        username: email, 
        password: password}
    ).pipe(
      tap(token => {
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn.next(true);
        return token;
      }),
    );
  }
  
  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn.next(false);
        delete this.token;
        return data;
      })
    )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn.next(true);
        } else {
          this.isLoggedIn.next(false);
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn.next(false);
      }
    );
  }

}
