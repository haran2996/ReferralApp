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
export class SignUpService {
  private signupUrl: string = "";
  constructor(private httpClient: HttpClient) {}
  signupUser(body: any) {
    const options = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient
      .post(this.signupUrl, body, { headers: options })
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = "";
    console.log(`error occured while calling the apis ${err.status}`, err);
    errMsg = err.error.status;
    return throwError(() => errMsg);
  }
}
