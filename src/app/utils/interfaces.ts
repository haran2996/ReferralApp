export interface User {
  userId: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  referralCode?: string;
}

export interface ReferralDetails {
  refferedUser: User;
  referralPoints: number;
  referralId: string;
  referredDate: string;
}
