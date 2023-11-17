import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class PaymentsRequests extends BaseRequests {

    async postPaymentCreate(status: number, requestData: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.payment_create}`, status, requestData);
    };
}