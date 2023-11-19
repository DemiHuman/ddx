import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseParameters, getBaseUserData } from '@entities/baseParameters';
import { Statuses } from '@libs/statuses';
import { getRandomLastName, getRandomPhone } from '@utils/randomUtils';

let User: {
    name: string,
    lastName: string,
    birthday: string,
    phone: string
};

test.beforeAll(async ({ request }) => {
    await test.step("Добавление нового пользователя", async () => {
        const response = (await new UserRequests(request).postCreateUser(
            Statuses.OK, {...await getBaseUserData()}));

        const responseBody = (await response.json()).data;

        User = {
            name: responseBody.name,
            lastName: responseBody.last_name,
            birthday:responseBody.birthday,
            phone: responseBody.phone
        }});
});

test.describe("Негативные АПИ тесты на поиск пользователя", () => {
    test("[negative] Поиск клиента по некорректному номеру телефона",async ({ request }) => {
        const responseBody = await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
                Statuses.NOT_FOUND, 
                {...await getBaseParameters(), 
                data: {
                    phone: "+79999999999"
                }});

            return (await response.json()).error;
        });

        await test.step("Проверка, что рользователь не найден", async () => {
            expect(responseBody.code).toBe("data_find_error");
            expect(responseBody.message).toBe("user not found");
        });
    });

    test("[negative] Поиск клиента по по имени, фамилии и дате рождения c неправильной связкой параметров",async ({ request }) => {
        const responseBody = await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
                Statuses.BAD_REQUEST, 
                {...await getBaseParameters(), 
                data: {
                    name: User.name,
                    last_name: User.lastName,
                    birthday: null
                }});

            return (await response.json()).error;
        });

        await test.step("Проверка, что возращается верная ошибка", async () => {
            expect(responseBody.code).toBe("bad_request");
            expect(responseBody.message).toBe("search parameters not presented in request");
        });
    });

    test("[negative] Поиск клиента по некорректным фамилии и email",async ({ request }) => {
        const responseBody = await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
                Statuses.NOT_FOUND, 
                {...await getBaseParameters(), 
                data: {
                    last_name: await getRandomLastName(),
                    phone: await getRandomPhone()
                }});

            return (await response.json()).error;
        });

        await test.step("Проверка, что рользователь не найден", async () => {
            expect(responseBody.code).toBe("data_find_error");
            expect(responseBody.message).toBe("user not found");
        });
    });
})