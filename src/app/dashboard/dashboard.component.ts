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
  currentUserDetails!: User;
  referralDetails!: ReferralDetails[];
  totalReferralPoints!: number;
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
      next: (res: any) => {
        this.currentUserDetails = res.userDetails as User;
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
      next: (res: any) => {
        this.apiStatus["referralDetails"] = API_STATUS.Success;
        this.referralDetails = res.referrals as ReferralDetails[];
        this.totalReferralPoints = this.referralDetails.reduce((prev, curr) => {
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
