export interface UserData {
  userName: string;
  companyName: string;
  accessToken: string;
  expiresAt: Date;
  isExpired: boolean;
  exp: number;
  iat: number;
}
