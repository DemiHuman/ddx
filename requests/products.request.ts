import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "api.json"

export default class ProductsRequest extends BaseRequests {

    async getProducts(status: number, parameters: object) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.products}`, status, parameters);
    };
}