import { test } from '@playwright/test';
import { getBaseCardData } from '@entities/baseParameters';
import AccessCardsRequests from '@requests/accessCards.requests';
import {Statuses} from "@libs/statuses";

test.describe("Тесты на добавление и редактирование карт доступа", () => {
    test("[pozitive] Создание карты доступа", async ({ request }) => {
        await new AccessCardsRequests(request).postAccessCards(Statuses.OK, await getBaseCardData());
    });
});