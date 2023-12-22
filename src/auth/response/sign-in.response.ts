import { IBaseResponse } from "src/base";
import { UserSignInData } from "../../types";

export interface ISignInResponse extends IBaseResponse {
  token: string;
  user: UserSignInData;
}