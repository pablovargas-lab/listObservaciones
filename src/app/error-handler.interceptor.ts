import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
 
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.logout();
        }
        // Aquí puedes manejar el error de manera global
        console.error('Error HTTP global:', error);
        Swal.fire('Error de conexión con el servidor, contactar con administrador');
 
        // Puedes relanzar el error para que otros interceptores o manejadores lo procesen
        return throwError(error);
      })
    );
  }

  private logout(): void {
    sessionStorage.removeItem('token');
    Swal.fire({
      title: 'Sesión Expirada',
      text: 'Tu sesión ha expirado y serás redirigido a la página de inicio.',
      icon: 'info',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false
    }).then((result) => {
      //this.router.navigate(['/redirect']);
      console.log('cerrar sesion')
    });
    // this.router.navigate(['/home']);  // Asegúrate de tener una ruta de login definida
    // this.router.navigate(['/redirect']);  // Asegúrate de tener una ruta de login definida
  }
}

