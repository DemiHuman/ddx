import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class UserRequests extends BaseRequests {

    async postCreateUser(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.users}`, status, body);
    };

    async getUserById(status: number, parameters: object, user_Id: number) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.users}/${user_Id}`, status, parameters);
    };
}