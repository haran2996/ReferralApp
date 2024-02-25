import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const shouldActivate = inject(AuthService).isLoggedIn();
  if (!shouldActivate) {
    inject(Router).navigate(["/login"]);
  }
  return shouldActivate;
};
