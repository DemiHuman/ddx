import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class UserRequests extends BaseRequests {

    /**
     * Если discount_id указан - в массиве data возвращается один объект, иначе - список объектов.
     * Возвращаются записи, в которых is_deleted = 0.
     * Если указан discount_id не существующей записи - вернется пустой массив data.
     *
     * @param status
     * @param parameters
     * @param discountId
     */
    async getDiscount(status: number, parameters: object) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.discounts}`, status, parameters);
    };
}