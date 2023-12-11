import { AlertVariant } from "src/enums";

export interface IBaseResponse {
  message: string;
  alertVariant: AlertVariant;
}