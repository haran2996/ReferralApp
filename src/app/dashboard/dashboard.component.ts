import { Component, OnInit } from "@angular/core";
import { ReferralDetails, User } from "../utils/interfaces";
import { API_STATUS } from "../utils/enum";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  currentUserDetails: User = {
    fname: "Hari",
    lname: "haran",
    email: "Lk4wB@example.com",
    referralCode: "12345",
    userId: "123",
  };
  referralDetails: ReferralDetails[] = [
    {
      refferedUser: {
        fname: "Hari",
        lname: "haran",
        email: "Lk4wB@example.com",
        referralCode: "12345",
        userId: "123",
      },
      referralPoints: 10,
      referralId: "123",
      referredDate: "12/12/2001",
    },
    {
      refferedUser: {
        fname: "Hari",
        lname: "haran",
        email: "Lk4wB@example.com",
        referralCode: "12345",
        userId: "124",
      },
      referralPoints: 10,
      referralId: "124",
      referredDate: "12/12/2001",
    },
    {
      refferedUser: {
        fname: "Hari",
        lname: "haran",
        email: "Lk4wB@example.com",
        referralCode: "12345",
        userId: "125",
      },
      referralPoints: 10,
      referralId: "125",
      referredDate: "12/12/2001",
    },
    {
      refferedUser: {
        fname: "Hari",
        lname: "haran",
        email: "Lk4wB@example.com",
        referralCode: "12345",
        userId: "125",
      },
      referralPoints: 10,
      referralId: "125",
      referredDate: "12/12/2001",
    },
  ];
  totalReferralPoints: number = 100;
  // currentUserDetails!: User;
  // referralDetails!: ReferralDetails[];
  // totalReferralPoints!: number
  showLoader: boolean = true;
  private apiStatus: { [key: string]: API_STATUS } = {};
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsersDetails();
    this.getReferalDetails();
  }

  private checkAllApiStatus() {
    this.showLoader = Object.values(this.apiStatus).some(
      (status) => status !== API_STATUS.Success && status !== API_STATUS.Error,
    );
  }

  getUsersDetails() {
    this.apiStatus["userDetails"] = API_STATUS.Loading;
    this.userService.getUsersDetails().subscribe({
      next: (res) => {
        this.currentUserDetails = res as User;
        this.apiStatus["userDetails"] = API_STATUS.Success;
        this.checkAllApiStatus();
      },
      error: (err) => {
        this.apiStatus["userDetails"] = API_STATUS.Error;
        this.checkAllApiStatus();
        console.log("Unable to get the user details", err);
      },
    });
  }

  getReferalDetails() {
    this.apiStatus["referralDetails"] = API_STATUS.Loading;
    this.userService.getReferalDetails().subscribe({
      next: (res) => {
        this.apiStatus["referralDetails"] = API_STATUS.Success;
        this.referralDetails = res as ReferralDetails[];
        this.referralDetails.reduce((prev, curr) => {
          return (prev += curr.referralPoints);
        }, 0);
        this.checkAllApiStatus();
      },
      error: (err) => {
        this.apiStatus["referralDetails"] = API_STATUS.Error;
        this.checkAllApiStatus();
        console.log("Unable to get the user referral details", err);
      },
    });
  }
}
