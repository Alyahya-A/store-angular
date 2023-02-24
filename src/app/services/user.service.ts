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
    if (!this.storage.has(this.USER_STORAGE_KEY)) {
      this.storage.set(this.USER_STORAGE_KEY, new User());
    }
  }

  isUserLoggedIn(): boolean {
    return this.getUser().token !== '';
  }

  login(email: string, password: string): Observable<User> {
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
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    return this.http.post<User>(environment.apiBaseUrl + '/users', requestBody);
  }

  getUser(): User {
    return this.storage.get(this.USER_STORAGE_KEY);
  }

  setUser(u: User): void {
    this.storage.set(this.USER_STORAGE_KEY, u);
  }

  logout(): void {
    this.storage.set(this.USER_STORAGE_KEY, new User());
  }
}
