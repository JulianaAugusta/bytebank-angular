import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUserService } from '@core/interfaces';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private _http = inject(HttpClient)
  private _loggedInUser = signal<Partial<User>>({});

  get loggedInUser(): Partial<User> {
    return this._loggedInUser();
  }

  setLoggedInUser(user: Partial<User>): void {
    this._loggedInUser.set(user);
  }
  
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>('/api/users')
  }

  setUser(user: Partial<User>): Observable<unknown> {
    return this._http.post<unknown>('/api/users', user)
  }
}
