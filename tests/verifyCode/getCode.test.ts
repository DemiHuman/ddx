import { expect, test } from '@playwright/test';
import ClubRequests from '@requests/clubs.requests';
import { getBaseParameters } from '@entities/baseParameters';
import UserRequests from '@requests/user.requests';
import VerifyRequests from '@requests/verify.request';
import {Statuses} from "@libs/statuses";
import {getUserRequestJson} from "@entities/user.requestJson";
import {getRandomEmail, getRandomPhone} from "@utils/randomUtils";


test.describe("API тесты на отправку кода верификации клиенту", () => {
    test("[pozitive] Отправку кода верификации клиенту", async ({ request }) => {
        const userRequests = new UserRequests(request);
        const clubRequests = new ClubRequests(request);
        const verifyRequests = new VerifyRequests(request);

        const clubId = await test.step("Получение id клуба", async () => {
            const clubGetResponse = await clubRequests.getClubs(Statuses.OK, {...await getBaseParameters()});
            return (await clubGetResponse.json()).data[0].id;
        });

        const {userId, userPhone} = await test.step("Получить id клиента", async () => {
            const requestBody = await getUserRequestJson(clubId, await getRandomEmail(), await getRandomPhone());
            const response =  await userRequests.postCreateUser(Statuses.OK, requestBody);
            const responseBody = (await response.json()).data;
            return {
                userId: responseBody.id,
                userPhone: responseBody.phone
            };
        });

        const response = await test.step("Отправить код верификации клиенту", async () => {
            const requestBody = {
                ...await getBaseParameters(),
                data: {
                    message_type: "sms",
                    contact: userPhone,
                    template: "mail_signing_an_agreement",
                    user_id: userId
                }
            };
            const response = await verifyRequests.postGetCod(Statuses.OK, requestBody);
            return response.json();
        });

        await test.step("Проверки",async () => {
            expect(response.status).toBe("OK");
        })
    });
});