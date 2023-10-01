import { SeverityWarningEnum } from "src/enum";

export interface SignInResponse {
    message: string;
    severityWarning: SeverityWarningEnum;
}