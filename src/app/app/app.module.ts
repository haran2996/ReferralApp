import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginService } from "../login/login.service";
import { HttpClientModule } from "@angular/common/http";
import { SignUpService } from "../sign-up/sign-up.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginService, SignUpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
