import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userDetailsUrl = "";
  private referralDetailsUrl = "";
  constructor(private httpClient: HttpClient) {}

  getUsersDetails(): Observable<unknown> {
    return this.httpClient.get(this.userDetailsUrl);
  }

  getReferalDetails(): Observable<unknown> {
    return this.httpClient.get(this.referralDetailsUrl);
  }
}
