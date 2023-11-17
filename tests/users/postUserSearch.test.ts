import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseParameters, getBaseUserData } from '@entities/baseParameters';
import { Statuses } from '@libs/statuses';

let User: {
    name: string,
    lastName: string,
    birthday: string,
    phone: string
};

let FoundUser: {
    name: string,
    lastName: string,
    birthday: string,
    phone: string
};

test.beforeEach(async ({ request }) => {
    await test.step("Получение id клиента", async () => {
        const response = (await new UserRequests(request).postCreateUser(
            Statuses.OK, {...await getBaseUserData()}));

        const responseBody = (await response.json()).data;

        User = {
            name: responseBody.name,
            lastName: responseBody.last_name,
            birthday:responseBody.birthday,
            phone: responseBody.phone
        };
   });
});

test.describe("АПИ тесты на поиск пользователя", () => {
    test("[positive] Поиск клиента по номеру телефона",async ({ request }) => {
        await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUserByPhone(
                Statuses.OK, 
                {...await getBaseParameters(), 
                data: {
                    phone: User.phone
                }});

            const responseBody = (await response.json()).data[0];
                
            FoundUser = {
                name: responseBody.name,
                lastName: responseBody.last_name,
                birthday:responseBody.birthday,
                phone: responseBody.phone
            };
        });

        await test.step("Проверка пользователя", async () => {
            expect(FoundUser).toEqual(User);
        })
        
    });

    test.skip("[negative] Поиск клиента по номеру телефона",async ({ request }) => {

    });

    test.skip("[positive] Поиск клиента по по имени, фамилии и дате рождения",async ({ request }) => {

    });

    test.skip("[negative] Поиск клиента по по имени, фамилии и дате рождения",async ({ request }) => {

    });

    test.skip("[positive] Поиск клиента по по фамилии и email",async ({ request }) => {

    });

    test.skip("[negative] Поиск клиента по по фамилии и email",async ({ request }) => {

    });
})