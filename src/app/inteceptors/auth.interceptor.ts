import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const newHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearr ${this.authService.getToken()}`,
    });

    let clone = request.clone({ headers: newHeaders });
    return next.handle(clone);
  }
}
