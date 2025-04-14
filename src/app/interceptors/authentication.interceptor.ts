

// NEW WAY
import { HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

export const AuthenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const authService = inject(AuthenticationService);

  if (req.url.includes(`${authService.apiUrl}/api/login`) || req.url.includes(`${authService.apiUrl}/api/signup`)) {
    return next(req);
  }

  authService.loadToken();
  const token = authService.getToken();
  const clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(clonedRequest);
};
