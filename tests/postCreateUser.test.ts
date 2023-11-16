import { test } from '@playwright/test';
import { getBaseUserData, getBaseUserDataWithoutPasswordFild, sportExperienceTypes } from '../entities/baseParameters';
import UserRequests from '../requests/user.requests';

test.describe("Тесты на создание нового клиента", async () => {
    test("[pozitive] Создание нового клиента", async ({ request }) => {
        await new UserRequests(request).postCreateUser(200, {...await getBaseUserData()});
    });

    sportExperienceTypes.forEach(sportExperience => {
        test(`[pozitive] Создание нового клиента c опытом: ${sportExperience}`, async ({ request }) => {
            await new UserRequests(request).postCreateUser(200, {...await getBaseUserData(sportExperience)});
        });
    });

    test("[negative] Создание нового клиента без поля 'password'", async ({ request }) => {
        await new UserRequests(request).postCreateUser(200, {...await getBaseUserDataWithoutPasswordFild()});
    });
});