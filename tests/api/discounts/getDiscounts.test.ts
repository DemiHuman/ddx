import { test } from '@playwright/test';
import UserRequests from "@requests/discounts.requests";
import {Statuses} from "@libs/statuses";
import { getBaseParameters } from '@entities/baseParameters';

test.describe("API тесты на акции", () => {
    test("[positive] Получение всех акций", async ({ request }) => {
            await new UserRequests(request).getDiscount(Statuses.OK, {...await getBaseParameters()});
    });
})