import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import paths from "../api.json"
import { log } from "../utils/loggers";


export default class BaseRequests {
    protected baseUrl: string;

    constructor( 
        protected request: APIRequestContext,
        private token = paths.tokens.test
    ) {
        this.baseUrl = paths.urls.base_url_api;
    };

    async get(url: string, status: number, parameters?: any): Promise<APIResponse> {
        log("request url", url);
        log("parameters", parameters);

        const response = await this.request.get(
            url, 
            {
                headers: {'Authorization': this.token},
                params: parameters
            });

        log("request status", response.status());
        log("response body", JSON.stringify(await response.json(), null, '\t'));

        expect(response.status(), await response.text()).toBe(status);

        return response;
    };

    async post(url: string, status: number, requestBody?: any): Promise<APIResponse> {
        log("request url", url);
        log("request body", JSON.stringify(await requestBody, null, '\t'));

        const response = await this.request.post(
            url, 
            {
                headers: {'Authorization': this.token},
                data: requestBody
            });

        log("request status", response.status());
        log("response body", JSON.stringify(await response.json(), null, '\t'));

        expect(response.status(), await response.text()).toBe(status);

        return response;
    };
}