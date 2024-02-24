import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}
  getUrl() {
    return this.router.url;
  }

  navigateTo(value: string) {
    this.router.navigate([value]);
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.logout();
  }
}
