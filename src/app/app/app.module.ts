import { BrowserModule } from "@angular/platform-browser";
import { NgModule, importProvidersFrom } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { interceptorProviders } from "../inteceptors";

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
  providers: [
    AuthService,
    UserService,
    importProvidersFrom(HttpClientModule),
    interceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
