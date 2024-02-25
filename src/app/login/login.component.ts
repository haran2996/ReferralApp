import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  disableButton: boolean = false;
  loginStatus: string = "NotLoggedIn";
  loginErrorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
  handleLogin() {
    const { email, password } = this.loginForm.value;
    this.disableButton = true;
    this.loginStatus = "LoggingIn";
    this.authService
      .loginUser({
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.disableButton = false;
          this.loginStatus = "LoggedIn";
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.disableButton = false;
          this.loginStatus = "ErrorLogin";
          this.loginErrorMessage = "Invalid username or password";
        },
      });

    console.log("this are the login values", this.loginForm.controls);
  }
}
