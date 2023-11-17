import { expect, test } from '@playwright/test';
import { getBaseCardData, getBaseParameters } from '@entities/baseParameters';
import AccessCardsRequests from '@requests/accessCards.requests';

test.describe("API тесты на получение информации о карт доступа", () => {
    test("[pozitive] Получить информацию о карте доступа", async ({ request }) => {
        const acr = new AccessCardsRequests(request);
        
        const createdCard = await acr.postAccessCards(200, await getBaseCardData());
        const response = await acr.getAccessCardById(200, await getBaseParameters(), (await createdCard.json()).data[0].id);
        expect((await response.json()).data[0].user_id).toBe((await createdCard.json()).data[0].user_id);
    });
});