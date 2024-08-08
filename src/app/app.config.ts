import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(),
  importProvidersFrom(HttpClientModule, ToastModule), AuthService, MessageService,
    AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
