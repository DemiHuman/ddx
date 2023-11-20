import { test } from '@playwright/test';
import { getBaseUserData, getBaseUserDataWithoutPasswordFild } from '@entities/baseParameters';
import UserRequests from '@requests/user.requests';
import {SportExperience} from "@libs/sportExperience";
import {Statuses} from "@libs/statuses";

test.describe("Тесты на создание нового клиента", async () => {
    test("[pozitive] Создание нового клиента", async ({ request }) => {
        await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserData()});
    });

    Object.values(SportExperience).forEach(sportExperience => {
        test(`[pozitive] Создание нового клиента c опытом: ${sportExperience}`, async ({ request }) => {
            await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserData(sportExperience)});
        });
    });

    test("[negative] Создание нового клиента без поля 'password'", async ({ request }) => {
        await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserDataWithoutPasswordFild()});
    });
});