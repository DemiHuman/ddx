import {test} from '@playwright/test';
import {getBaseParameters} from '@entities/baseParameters';
import UserRequests from '@requests/user.requests';
import {SportExperience} from "@libs/sportExperience";
import {Statuses} from "@libs/statuses";
import {BaseRequestJson} from "@entities/base.requestJson";
import {getUserRequestJson, UserDataRequestJson} from "@entities/user.requestJson";
import {getRandomEmail, getRandomPhone} from "@utils/randomUtils";
import ClubRequests from "@requests/clubs.requests";

let requestData: BaseRequestJson<UserDataRequestJson>;
let clubId: number;

test.beforeAll(async ({ request }) => {
    clubId = await test.step("Получение id клуба", async () => {
        const clubGetResponse = await new ClubRequests(request).getClubs(Statuses.OK, {...await getBaseParameters()});
        return (await clubGetResponse.json()).data[0].id;
    });
});

test.beforeEach(async () => {
    requestData = await getUserRequestJson(clubId, await getRandomEmail(), await getRandomPhone());
});

test.describe("API Тесты на создание клиентов", async () => {
    test("[pozitive] Создание нового клиента", async ({ request }) => {
        await new UserRequests(request).postCreateUser(Statuses.OK, requestData);
    });

    Object.values(SportExperience).forEach(sportExperience => {
        test(`[pozitive] Создание нового клиента c опытом: ${sportExperience}`, async ({ request }) => {
            (requestData.data as UserDataRequestJson).sport_experience = sportExperience;

            await new UserRequests(request).postCreateUser(Statuses.OK, requestData);
        });
    });

    test("[negative] Создание нового клиента без поля 'password'", async ({ request }) => {
        (requestData.data as UserDataRequestJson).password = null;

        await new UserRequests(request).postCreateUser(Statuses.OK, requestData);
    });
});