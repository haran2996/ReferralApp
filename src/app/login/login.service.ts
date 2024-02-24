import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private loginUrl: string = "https://jsonplaceholder.typicode.com/users";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  loginUser(body: { email: string; password: string }) {
    const options = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient
      .post(
        this.loginUrl,
        {
          email: body.email,
          password: body.password,
        },
        { headers: options },
      )
      .pipe(
        tap((data) => {
          sessionStorage.setItem("token", (data as { token: string }).token);
          this.router.navigate(["dashboard"]);
        }),
        catchError(this.handleError),
      );
  }

  isLoggedIn() {
    return !!sessionStorage.getItem("token");
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = "";
    console.log(`error occured while calling the apis ${err.status}`, err);
    errMsg = err.error.status;
    return throwError(() => errMsg);
  }
}
