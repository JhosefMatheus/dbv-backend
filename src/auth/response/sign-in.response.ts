import { IBaseResponse } from "src/base";
import { UserData } from "../../types";

export interface ISignInResponse extends IBaseResponse {
  token: string;
  user: UserData;
}