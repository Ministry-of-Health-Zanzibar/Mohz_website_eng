import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgwWowModule } from 'ngx-wow';
import { NgwWowService } from 'ngx-wow';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // NgwWowModule,
    provideAnimations(),
    NgwWowService,
    provideHttpClient(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AuthenticationGuard,
    provideHttpClient(
      withInterceptors([AuthenticationInterceptor])
    ),
  ]
};
