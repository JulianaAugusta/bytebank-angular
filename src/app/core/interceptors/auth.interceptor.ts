import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const notificationService = inject(NotificationService);

  //@to do validar exibição de toast para token expirado
  if (!auth.isAuthenticated() && !req.url.includes('users')) {
    notificationService.showToast('Sessão expirada', 'error');
    auth.logout(); 
    return EMPTY //bloqueio ou encerra a requisição sem lançar erro
  }

  return next(req);
};
