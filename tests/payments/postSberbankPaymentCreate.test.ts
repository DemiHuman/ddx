import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseUserDataWithDetailingClubId, getPaymentData, getUserPaymentPlansData } from '@entities/baseParameters';
import UsersPaymentsPlansRequests from '@requests/usersPaymentsPlans.requests';
import { Statuses } from '@libs/statuses';
import PaymentsRequests from '@requests/payments.request';
import { PaymentProviders } from '@libs/paymentProviders';
import { PaymentTypes } from '@libs/paymentTypes';
import { TransactionProviders } from '@libs/transactionProviders';
import { TransactionGates } from '@libs/transactionGates';
import { PaymentsStatuses } from '@libs/paymentsStatuses';

let userId: number;
let userPaymentPlanId: number;
const clubId = 17; //id клуба, где шлюз Сбера

test.beforeEach(async ({ request }) => {
    userId = await test.step("Получение id клиента", async () => {
        const response = await new UserRequests(request).postCreateUser(Statuses.OK, {...await getBaseUserDataWithDetailingClubId(clubId)});
        return (await response.json()).data.id
   });

   userPaymentPlanId = await test.step("Получение id подписки клиента", async () => {
    const response = await new UsersPaymentsPlansRequests(request).postAddUserPaymentPlansForUser(
        Statuses.OK, userId, {...await getUserPaymentPlansData()});
        return (await response.json()).data[0].id;
    });
});

test.describe("АПИ тесты на создание запроса на оплату через Сбербанк", () => {
    test("[positive] Клиентский запрос на оплату",async ({ request }) => {
        const response = await test.step("Оправка клиенту запроса на оплату", async () => {
            return await new PaymentsRequests(request).postPaymentCreate(
                Statuses.OK, 
                {
                    ...await getPaymentData(
                    userId, 
                    PaymentTypes.PAYMENT,
                    TransactionProviders.SUBSCRIPTION_PAYMENT,
                    TransactionGates.CRM,
                    PaymentProviders.SBERBANK, 
                    userPaymentPlanId
                    )
                });
        });
        
        await test.step("Проверка статуса платежа и провайдера оплаты", async () => {
            expect.soft((await response.json()).transaction.status).toBe(PaymentsStatuses.IN_PROGRESS);
            expect.soft((await response.json()).transaction.payment_service_id).toBe(PaymentProviders.SBERBANK);
        });
    });

    test("[negative] Клиентский запрос на оплату",async ({ request }) => {
        const response = await test.step("Оправка клиенту запроса на оплату", async () => {
            return await new PaymentsRequests(request).postPaymentCreate(
                Statuses.BAD_REQUEST, 
                {
                    ...await getPaymentData(
                    userId, 
                    PaymentTypes.PAYMENT,
                    null,
                    TransactionGates.CRM,
                    PaymentProviders.SBERBANK, 
                    userPaymentPlanId
                    )
                });
        });
        
        await test.step("Проверка кода ошибки", async () => {
            expect.soft((await response.json()).error.code).toBe("wrong_provider");
        });

        await test.step("Проверка сообщения ошибки", async () => {
            expect.soft((await response.json()).error.message).toBe("not payment provider");
        });
    });
})