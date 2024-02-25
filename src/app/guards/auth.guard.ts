import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  console.log(
    "testing----->>>>>",
    route,
    state,
    inject(AuthService).isLoggedIn(),
  );
  return inject(AuthService).isLoggedIn();
};
