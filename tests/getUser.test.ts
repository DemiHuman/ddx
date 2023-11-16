import { expect, test } from '@playwright/test';
import ClubRequests from '../requests/clubs.requests';
import { getBaseParameters, getBaseUserDataWithDetailingClubId } from '../entities/baseParameters';
import UserRequests from '../requests/user.requests';


test.describe("API тесты на получение пользователя", () => {
    test("[pozitive] Получение нового пользователя", async ({ request }) => {
        const userRequests = new UserRequests(request);
        const clubRequests = new ClubRequests(request);

        const clubGetResponse = await clubRequests.getClubs(200, {...await getBaseParameters()});
        const club_id = (await clubGetResponse.json()).data[0].id;

        const userPostResponse = await userRequests.postCreateUser(200, {...await getBaseUserDataWithDetailingClubId(club_id)});
        const userGetResponse = await userRequests.getUserById(200, {...await getBaseParameters()}, (await userPostResponse.json()).data.id);

        expect((await userGetResponse.json()).data.id).toBe((await userPostResponse.json()).data.id);
        expect((await userGetResponse.json()).data.home_club_id).toBe(club_id);
    });
});