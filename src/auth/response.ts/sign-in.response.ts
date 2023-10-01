import { SeverityWarningEnum } from "src/enums";

export interface SignInResponse {
    message: string;
    severityWarning: SeverityWarningEnum;
}