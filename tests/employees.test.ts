import { expect, request, test } from '@playwright/test';
import api from "./../api.json";
import { getBaseParameters } from '../entities/baseParameters';

test.describe("Тесты по сотрудникам", async () => {
    test("[pozitive] Получение информации по сотрудникам", async ({ request }) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.path.employees_positions}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                params: {...await getBaseParameters()},
            });

        expect(response.status(), await response.text()).toBe(200);
    });
});