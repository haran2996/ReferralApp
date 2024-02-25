import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HostInterceptor implements HttpInterceptor {
  private apiHostUrl = "";
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const newUrl = request.url.trim().startsWith("/")
      ? `${this.apiHostUrl}${request.url.trim()}`
      : request.url.trim();
    let clone = request.clone({ url: newUrl });
    return next.handle(clone);
  }
}
