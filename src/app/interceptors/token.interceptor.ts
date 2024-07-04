import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken()
  return next(
    req.clone({
      headers: req.headers.set('Authorization', `'Bearer ${token}`)
    })
  );
};