import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('BEFORE Token: ');
        console.log('Request: ', req.url);
        const token = this.authService.getToken();
        console.log('Token: ', token);
        if (token) {
            console.log('Si hay Token: ', token);
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(cloned);
        } else {
            console.log('No hay Token: ', token);
            return next.handle(req);
        }
    }
}
