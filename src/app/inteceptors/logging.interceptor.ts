import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log(`Requesting for ${request.url}`, request);
    return next.handle(request).pipe(
      tap((data) => {
        console.log(`Received response for ${request.body}:${request.url}`, {
          request,
          data,
        });
      }),
    );
  }
}
