import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "../api.json"

export default class UserRequests extends BaseRequests {

    async postCreateUser(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.users}`, status, body);
    };
}