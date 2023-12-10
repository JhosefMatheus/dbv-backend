import { UserData } from "../../types";

export interface ISignInResponse {
  message: string;
  token: string;
  user: UserData;
}