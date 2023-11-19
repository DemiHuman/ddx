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

    /**
     * На вход передаются либо name + last_name + birthday, либо phone, 
     * либо email/email+name/email+name+last_name/email+last_name, либо access_card_number. 
     * Параметры phone/email/access_card_number могут существовать самостоятельно 
     * и искать только по этим параметрам. Если в запросе передан только name/last_name/birthday, 
     * то в ответ отдаем 400, если данные три значения переданы в связке 
     * с самостоятельными параметрами (phone/email/access_card_number), то осуществляем поиск и отдаем 200.
     * @param status 
     * @param body 
     * @returns 
     */
    async searchUser(status: number, body: object) : Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${paths.path.users_search}`, status, body);
    };
}