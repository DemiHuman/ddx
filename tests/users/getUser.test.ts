import { expect, test } from '@playwright/test';
import ClubRequests from '@requests/clubs.requests';
import { getBaseParameters, getBaseUserDataWithDetailingClubId } from '@entities/baseParameters';
import UserRequests from '@requests/user.requests';
import {Statuses} from "@libs/statuses";


test.describe("API тесты на получение пользователя", () => {
    test("[pozitive] Получение нового пользователя", async ({ request }) => {
        const userRequests = new UserRequests(request);
        const clubRequests = new ClubRequests(request);


        const clubId = await test.step("Получаем ID клуба", async () => {
            const clubGetResponse = await clubRequests.getClubs(Statuses.OK, {...await getBaseParameters()});
            return (await clubGetResponse.json()).data[0].id;
        });
        
        const userPostResponse = await test.step("Заведение нового пользователя", async () => {
            return await userRequests.postCreateUser(Statuses.OK, {...await getBaseUserDataWithDetailingClubId(clubId)});

        });

        const userGetResponse = await test.step("Получение данных по заведённому пользователю", async () => {
            return await userRequests.getUserById(Statuses.OK, {...await getBaseParameters()}, (await userPostResponse.json()).data.id);
        });

        await test.step("Проверки", async () => {
            expect((await userGetResponse.json()).data.id).toBe((await userPostResponse.json()).data.id);
            expect((await userGetResponse.json()).data.home_club_id).toBe(clubId);
        });
    });
});