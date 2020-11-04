export interface AccessHistory {
  date: Date;
  resource: string;
  userName: string;
  userEmail: string;
  userDevice: string;
  userLocation?: string;
  query?: {};
}
