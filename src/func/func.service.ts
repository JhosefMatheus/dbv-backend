import { Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";

@Injectable()
export class FuncService {
    constructor() {}

    hashText(text: string): string {
        const hashedText: string = CryptoJS.SHA256(text).toString();

        return hashedText;
    }
}