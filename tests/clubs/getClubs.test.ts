import { expect, test } from '@playwright/test';
import api from "api.json";
import { getBaseParameters } from '@entities/baseParameters';

test.describe("АПИ  тесты на получение списка клубов", async () => {
    test("[pozitive] Получить список клубов", async ({ request }) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.path.clubs}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                params: {...await getBaseParameters()}
            });

        expect(response.status(), await response.text()).toBe(200);
    });

    test("[negative] Тест не возвращает список клубов", async ({ request }) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.path.clubs}`,
            {
                headers: {
                    'Authorization': `${api.tokens.test}`
                },
                params: {
                    "session_id": "2",
                    "request_id": "2",
                    "request_source": ""
                }
            });

        expect(response.status(), await response.text()).not.toBe(200);
    });

});