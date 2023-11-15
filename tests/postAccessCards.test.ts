import { expect, test } from '@playwright/test';
import api from "../api.json";
import { getBaseCardData } from '../entities/baseParameters';
import { log } from '../utils/loggers';

test.describe("Тесты на добавление и редактирование карт доступа", () => {
    test("[pozitive] Создание карты доступа", async ({ request }) => {
        const url = `${api.urls.base_url_api}${api.path.access_cards}`;
        const parameters = {...await getBaseCardData()};

        log("request url", url);
        log("parameters", parameters);
        const response = await request.post(
            url,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: parameters,
            });

        log("request status", response.status());
        log("response body", JSON.stringify(await response.json, null, '\t'));
        expect(response.status(), await response.text()).toBe(200);
    });
});