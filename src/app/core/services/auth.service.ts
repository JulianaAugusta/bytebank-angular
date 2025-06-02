import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService } from '@core/interfaces/auth.interface';
import { User } from '@core/models/user';
import { map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';
import { hashPassword } from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private platformId = inject(PLATFORM_ID);
  //PLATFORM_ID identifica a plataforma em que o aplicativo está sendo executado (navegador ou servidor). Esse ID é armazenado em platformId para uso posterior.
  private router = inject(Router);
  private userService = inject(UserService);

  public login(formLogin: Partial<User>): Observable<boolean> {
    return this.userService.getUsers().pipe(
      map((users: User[]) =>
        users.find(user =>
          user.email === formLogin.email &&
          user.password === hashPassword(formLogin.password ?? '')
        ) || null
      ),
      tap(user => {
        if (user && isPlatformBrowser(this.platformId)) {
          this._generateJwt(user);
          this.userService.setLoggedInUser(user);
        }
      }),
      switchMap(user => { //uso do switch para retorno de observable
        if (user) {
          return of(true);
        } else {
          return throwError(() => new Error('Invalid credentials'));
        }
      })
    );
  }

  public signUp(formLogin: Partial<User>): Observable<boolean> {
    return this.userService.getUsers().pipe(
      switchMap((users: User[]) => {
        const exist = users.some(u => u.email === formLogin.email)
        if (exist) {
          return new Observable<boolean>(observer => {
            observer.next(false);
            observer.complete();
          });
        }

        const genId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        formLogin = {
          ...formLogin,
          id: genId,
          password: hashPassword(formLogin.password || '')
        }
        return this.userService.setUser(formLogin).pipe(map(() => true));
      })
    );
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  getTokenPayload(): User & {exp: number} | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = atob(token);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenPayload();
    const isValid = !!payload && typeof payload['exp'] === 'number' && payload['exp'] > Date.now();
    return isValid;
  }

  private _generateJwt(user: User): void {
    const payload: User & {exp: number} = {
      id: user.id,
      email: user.email,
      name: user.name,
      exp: Date.now() + 10 * 60 * 1000 // 10 minutos
    };
    localStorage.setItem('token', btoa(JSON.stringify(payload)));
  }
}
