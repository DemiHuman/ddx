import { test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import {getBaseParameters} from '@entities/baseParameters';
import UsersPaymentsPlansRequests from '@requests/usersPaymentsPlans.requests';
import { Statuses } from '@libs/statuses';
import ClubRequests from "@requests/clubs.requests";
import {getUserRequestJson} from "@entities/user.requestJson";
import {getRandomEmail, getRandomPhone} from "@utils/randomUtils";
import {getPaymentPlanRequestJson} from "@entities/paymentPlan.requestJson";

let clubId: number;
let userId: number;

test.beforeAll(async ({ request }) => {
    clubId = await test.step("Получение id клуба", async () => {
        const clubGetResponse = await new ClubRequests(request).getClubs(Statuses.OK, {...await getBaseParameters()});
        return (await clubGetResponse.json()).data[0].id;
    });

    userId = await test.step("Получить id пользователя", async () => {
        const requestBody = await getUserRequestJson(clubId, await getRandomEmail(), await getRandomPhone());
        const response = await new UserRequests(request).postCreateUser(Statuses.OK, requestBody);
        return (await response.json()).data.id;
    });
});

test.describe("АПИ тесты по работе с подписками пользователя", () => {
    test("Добавление подписки пользователю",async ({ request }) => {
        await test.step("Добавление подписки пользователю", async () => {
            const requestBody = await getPaymentPlanRequestJson(userId, clubId);

            await new UsersPaymentsPlansRequests(request).postAddUserPaymentPlansForUser(Statuses.OK, userId, requestBody);
        });
    });
})