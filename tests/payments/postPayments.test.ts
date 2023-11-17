import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseUserData, getPaymentData, getUserPaymentPlansData } from '@entities/baseParameters';
import UsersPaymentsPlansRequests from '@requests/usersPaymentsPlans.requests';
import { Statuses } from '@libs/statuses';
import PaymentsRequests from '@requests/payments.request';
import { PaymentProviders } from '@libs/paymentProviders';
import { PaymentTypes } from '@libs/paymentTypes';
import { TransactionProviders } from '@libs/transactionProviders';
import { TransactionGates } from '@libs/transactionGates';
import { PaymentsStatuses } from '@libs/paymentsStatuses';

test.describe("АПИ тесты на создание запроса на оплату", () => {
    test("[positive] Клиентский запрос на оплату",async ({ request }) => {
        const userId = await test.step("Получение id клиента", async () => {
             const response = await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserData()});
             return (await response.json()).data.id
        });

        const userPaymentPlanId = await test.step("Получение id подписки клиента", async () => {
            const response = await new UsersPaymentsPlansRequests(request).postAddUserPaymentPlansForUser(
                Statuses.OK, userId, {...await getUserPaymentPlansData()});
                return (await response.json()).data[0].id;
        });

        const response = await test.step("Оправка клиенту запроса на оплату", async () => {
            return await new PaymentsRequests(request).postPaymentCreate(
                Statuses.OK, 
                {
                    ...await getPaymentData(
                    userId, 
                    PaymentTypes.PAYMENT,
                    TransactionProviders.SUBSCRIPTION_PAYMENT,
                    TransactionGates.CRM,
                    PaymentProviders.CLOUD_PAYMENTS, 
                    userPaymentPlanId
                    )
                });
        });
        
        await test.step("Проверки", async () => {
            expect((await response.json()).transaction.status).toBe(PaymentsStatuses.IN_PROGRESS);
            expect((await response.json()).transaction.payment_service_id).toBe(PaymentProviders.CLOUD_PAYMENTS);
        });
    });
})