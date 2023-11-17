import { expect, test } from '@playwright/test';
import ClubRequests from '@requests/clubs.requests';
import { getBaseParameters, getBaseUserDataWithDetailingClubId } from '@entities/baseParameters';
import UserRequests from '@requests/user.requests';
import VerifyRequests from '@requests/verify.request';


test.describe("API тесты на отправку кода верификации клиенту", () => {
    test("[pozitive] Отправку кода верификации клиенту", async ({ request }) => {
        const userRequests = new UserRequests(request);
        const clubRequests = new ClubRequests(request);
        const verifyRequests = new VerifyRequests(request);

        const club_id = await test.step("Получение id клуба", async () => {
            const clubGetResponse = await clubRequests.getClubs(200, {...await getBaseParameters()});
            return (await clubGetResponse.json()).data[0].id;
        });

        const {userId, userPhone} = await test.step("Получить id клиента", async () => {
            const response =  (await (await userRequests.postCreateUser(200, {...await getBaseUserDataWithDetailingClubId(club_id)})).json()).data;
            return { userId: response.id, userPhone: response.phone };
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
            const response = await verifyRequests.postGetCod(200, requestBody);
            return response.json();
        });

        await test.step("Проверки",async () => {
            expect(response.status).toBe("OK");
        })
    });
});