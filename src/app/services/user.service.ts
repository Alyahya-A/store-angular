import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER_STORAGE_KEY = 'USER_STORAGE_KEY';

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient
  ) {
    // initialize user in session storage
    if (!this.storage.has(this.USER_STORAGE_KEY)) {
      this.storage.set(this.USER_STORAGE_KEY, new User());
    }
  }

  isUserLoggedIn(): boolean {
    // inspect the User model for token
    return this.getUser().token !== '';
  }

  login(email: string, password: string): Observable<User> {
    // call backend API to generate token
    const requestBody = {
      email: email,
      password: password
    };

    return this.http.post<User>(environment.apiBaseUrl + '/token', requestBody);
  }

  createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
    // call backend API to create user
    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };

    return this.http.post<User>(environment.apiBaseUrl + '/users', requestBody);
  }

  getUser(): User {
    // get user from session storage
    return this.storage.get(this.USER_STORAGE_KEY);
  }

  setUser(u: User): void {
    this.storage.set(this.USER_STORAGE_KEY, u);
  }

  logout(): void {
    this.storage.set(this.USER_STORAGE_KEY, new User());
  }
}
