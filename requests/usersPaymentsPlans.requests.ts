import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class UsersPaymentsPlansRequests extends BaseRequests {

    async postAddUserPaymentPlansForUser(status: number, userId: number, requestData: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.users}/${userId}${paths.path.user_payment_plans}`, status, requestData);
    };
}