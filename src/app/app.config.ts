import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgwWowService } from 'ngx-wow';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    MatNativeDateModule,
    NgwWowService,
    provideHttpClient(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AuthenticationGuard,
    provideHttpClient(withInterceptors([AuthenticationInterceptor])),

    // { provide: DateAdapter, useClass: NativeDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
    // { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
};
