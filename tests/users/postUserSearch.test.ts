import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseUserData } from '@entities/baseParameters';
import { Statuses } from '@libs/statuses';

let userId: number;

test.beforeEach(async ({ request }) => {
    userId = await test.step("Получение id клиента", async () => {
        const response = await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserData()});
        return (await response.json()).data.id
   });
});

test.describe.skip("АПИ тесты на поиск пользователя", () => {
    test("[positive] Поиск клиента по номеру телефона",async ({ request }) => {

    });

    test("[negative] Поиск клиента по номеру телефона",async ({ request }) => {

    });

    test("[positive] Поиск клиента по по имени, фамилии и дате рождения",async ({ request }) => {

    });

    test("[negative] Поиск клиента по по имени, фамилии и дате рождения",async ({ request }) => {

    });

    test("[positive] Поиск клиента по по фамилии и email",async ({ request }) => {

    });

    test("[negative] Поиск клиента по по фамилии и email",async ({ request }) => {

    });
})