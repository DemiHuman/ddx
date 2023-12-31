import { expect, test } from '@playwright/test';
import api from "api.json";
import { getBaseNoteData } from '@entities/baseParameters';
import {Statuses} from "@libs/statuses";

test.describe("Тесты на заметки", async () => {
    test("[pozitive] Создание новой заметки", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.path.notes}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {...await getBaseNoteData()},
            });

        expect(response.status(), await response.text()).toBe(Statuses.OK);
    });
});