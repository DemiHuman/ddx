import { expect, test } from '@playwright/test';
import api from "./../api.json";
import { getBaseParameters } from '../entities/baseParameters';

test.describe("АПИ  тесты на получение списка тарифов", async () => {
    test("[pozitive] Получить список активных тарифов", async ({ request }) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.path.paymentsPlans}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                params: {
                    ...await getBaseParameters(), 
                    "is_active": true, 
                    "is_deleted": false
                }
            });

        expect(response.status(), await response.text()).toBe(200);
    })
});