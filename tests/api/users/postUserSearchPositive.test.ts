import { expect, test } from '@playwright/test';
import UserRequests from '@requests/user.requests';
import { getBaseParameters } from '@entities/baseParameters';
import { Statuses } from '@libs/statuses';
import ClubRequests from "@requests/clubs.requests";
import {getUserRequestJson} from "@entities/user.requestJson";
import {getRandomEmail, getRandomPhone} from "@utils/randomUtils";

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

test.beforeAll(async ({ request }) => {
    const clubId = await test.step("Получение id клуба", async () => {
        const clubGetResponse = await new ClubRequests(request).getClubs(Statuses.OK, {...await getBaseParameters()});
        return (await clubGetResponse.json()).data[0].id;
    });

    await test.step("Добавление нового пользователя", async () => {
        const requestBody = await getUserRequestJson(clubId, await getRandomEmail(), await getRandomPhone());
        const response = await new UserRequests(request).postCreateUser(Statuses.OK, requestBody);

        const responseBody = (await response.json()).data;

        User = {
            name: responseBody.name,
            lastName: responseBody.last_name,
            birthday:responseBody.birthday,
            phone: responseBody.phone
        }});
});

test.describe("АПИ тесты на поиск пользователя", () => {
    test("[positive] Поиск клиента по номеру телефона",async ({ request }) => {
        await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
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
            }});

        await test.step("Проверка пользователя", async () => {
            expect(FoundUser).toStrictEqual(User);
        });
    });

    test("[positive] Поиск клиента по по имени, фамилии и дате рождения",async ({ request }) => {
        await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
                Statuses.OK, 
                {...await getBaseParameters(), 
                data: {
                    name: User.name,
                    last_name: User.lastName,
                    birthday: User.birthday
                }});

            const responseBody = (await response.json()).data[0];
                
            FoundUser = {
                name: responseBody.name,
                lastName: responseBody.last_name,
                birthday:responseBody.birthday,
                phone: responseBody.phone
            }});

        await test.step("Проверка пользователя", async () => {
            expect(FoundUser).toStrictEqual(User);
        });
    });

    test("[positive] Поиск клиента по по фамилии и email",async ({ request }) => {
        await test.step("Поиск пользователя", async () => {
            const response = await new UserRequests(request).searchUser(
                Statuses.OK, 
                {...await getBaseParameters(), 
                data: {
                    last_name: User.lastName,
                    phone: User.phone
                }});

            const responseBody = (await response.json()).data[0];
                
            FoundUser = {
                name: responseBody.name,
                lastName: responseBody.last_name,
                birthday:responseBody.birthday,
                phone: responseBody.phone
            }});

        await test.step("Проверка пользователя", async () => {
            expect(FoundUser).toStrictEqual(User);
        });
    });
})