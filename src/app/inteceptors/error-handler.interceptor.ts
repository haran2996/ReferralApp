import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse): Observable<any> => {
        let errMsg = "";
        console.log(`error occured while calling the apis ${err.status}`, err);
        if (err.error.status == 401) {
          console.log("User token is expired or invalid so routing to login");
          this.router.navigate(["login"]);
        }
        errMsg = err.error.status;
        return throwError(() => errMsg);
      }),
    );
  }
}
