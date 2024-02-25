import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { ErrorHandlerInterceptor } from "./error-handler.interceptor";
import { LoggingInterceptor } from "./logging.interceptor";
import { HostInterceptor } from "./host.interceptor";

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HostInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true,
  },
];
