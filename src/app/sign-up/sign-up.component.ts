import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  disableButton: boolean = false;
  signupStatus: string = "NotSignedUp";
  signupErrorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      cnfpassword: ["", Validators.required],
      fname: ["", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lname: ["", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      referralCode: "",
    });
  }
  handleSignup() {
    this.signupStatus = "Signingup";
    this.signupErrorMessage = "";
    const { email, fname, lname, password, referralCode } =
      this.signupForm.value;
    this.authService
      .signupUser({
        email,
        fname,
        lname,
        password,
        referralCode: referralCode ? referralCode : undefined,
      })
      .subscribe({
        next: (res) => {
          console.log("Signup successful", res);
          this.signupStatus = "SignedUp";
          this.signupForm.reset();
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.log("API errored", err);
          this.signupStatus = "ErrorSignup";
          this.signupErrorMessage = "Couldn't sign up!!  Please try again";
        },
      });
  }
}
