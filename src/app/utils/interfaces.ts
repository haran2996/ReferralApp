export interface User {
  fname: string;
  lname: string;
  email: string;
  password?: string;
  referralCode?: string;
}

export interface RefferalDetails {
  refferedUser: User;
  refferalPoints: number;
}
