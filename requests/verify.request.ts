import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class VerifyRequests extends BaseRequests {

    async postGetCod(status: number, requestData: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.get_code}`, status, requestData);
    };
}