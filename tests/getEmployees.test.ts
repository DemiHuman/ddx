import { expect, request, test } from '@playwright/test';
import api from "../api.json";
import { clubsId, getBaseParameters } from '../entities/baseParameters';
import { log } from '../utils/loggers';

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


    clubsId.forEach(id => {
        test(`[pozitive] Получение списка позиций по id клуба: ${id}`, async ({ request }) => {
            const url = `${api.urls.base_url_api}${api.path.employees_positions}`;
            const parameters = {...await getBaseParameters(), id};
    
            log("request url", url);
            log("parameters", parameters);
            const response = await request.get(
                url,
                {
                    headers: {
                        "Authorization": `${api.tokens.test}`
                    },
                    params: parameters
                });
    
            let responseBody = await response.json();
            
            log("request status", response.status());
            log("response body", responseBody.data.map(item => item.name));
            expect(response.status(), await response.text()).toBe(200);
        });
    });
});