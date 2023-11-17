import { test } from '@playwright/test';
import { getBaseParameters } from '../../entities/baseParameters';
import PaymentsPlansRequests from '../../requests/paymentsPlans.requests';

test.describe("АПИ  тесты на получение списка тарифов", async () => {
    test("[pozitive] Получить список активных тарифов", async ({ request }) => {
        const parameters = {
            ...await getBaseParameters(), 
            "is_active": true, 
            "is_deleted": false
        };

        await new PaymentsPlansRequests(request).getPaymentsPlans(200, parameters);
    })
});