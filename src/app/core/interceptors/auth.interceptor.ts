import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  //@to do validar exibição de toast para token expirado
  if (!auth.isAuthenticated() && !req.url.includes('users')) {
    auth.logout(); 
    return EMPTY //bloqueio ou encerra a requisição sem lançar erro
  }

  return next(req);
};
