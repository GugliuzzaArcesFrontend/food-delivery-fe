import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from '../interfaces/user';
import { map } from 'rxjs';

export const adminLoggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.authedUser$.pipe(map(user => user != null ? JSON.parse(user) : null)))
    return true;
  else {
    router.navigate(['/shops'])
    return false
  }

}