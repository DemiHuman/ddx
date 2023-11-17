import { test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseUserData, getUserPaymentPlansData } from '@entities/baseParameters';
import UsersPaymentsPlansRequests from '@requests/usersPaymentsPlans.requests';
import { Statuses } from '@libs/statuses';

test.describe("АПИ тесты по работе с подписками", () => {
    test("Добавление подписки клиенту",async ({ request }) => {
        const {userId, clubId} = await test.step("Получить id клиента и id клуба клиента", async () => {
             const response = await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserData()});
             return {userId: (await response.json()).data.id, clubId: (await response.json()).data.home_club_id};
        });

        await test.step("Добавление подписки пользователю", async () => {
            await new UsersPaymentsPlansRequests(request).postAddUserPaymentPlansForUser(
                Statuses.OK, userId, {...await getUserPaymentPlansData(clubId)});
        });
    });
})