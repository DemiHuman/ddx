import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class PaymentsPlansRequests extends BaseRequests {

    async getPaymentsPlans(status: number, parameters: object) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.payment_plans}`, status, parameters);
    };
}