import { APIResponse } from "@playwright/test";
import BaseRequests from "./baseRequests.request";
import paths from "../api.json"

export default class ClubRequests extends BaseRequests {

    async getClubs(status: number, parameters: object) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.clubs}`,status, parameters);
    };

    async getClubsById(status: number, parameters: object, club_id: number) : Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${paths.path.clubs}/${club_id}`, status, parameters);
    };
}