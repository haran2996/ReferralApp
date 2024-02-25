export interface User {
  userId: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  referralCode?: string;
}

export interface ReferralDetails {
  refferedUser: String;
  referralPoints: number;
  referralId: string;
  referredDate: string;
  referredUserDetails: User[];
}
