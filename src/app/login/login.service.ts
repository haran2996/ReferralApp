import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private loginUrl: string = "";
  constructor(private httpClient: HttpClient) {}
  loginUser(body: { username: string; password: string }) {
    const options = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient
      .post(
        this.loginUrl,
        {
          username: body.username,
          password: body.password,
        },
        { headers: options },
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = "";
    console.log(`error occured while calling the apis ${err.status}`, err);
    errMsg = err.error.status;
    return throwError(() => errMsg);
  }
}
