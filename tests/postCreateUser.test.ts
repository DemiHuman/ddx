import { expect, test } from '@playwright/test';
import api from "./../api.json";
import { getRandomEmail, getRandomPhone, getRandomRequestId, getRandomSessionId } from '../utils/randomUtils';
import { getBaseUserData, sport_experience_types } from '../entities/baseParameters';

test.describe("Тесты на создание нового клиента", async () => {
    test("[pozitive] Создание нового клиента", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.path.users}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {...await getBaseUserData()},
            });

        expect(response.status(), await response.text()).toBe(200);
    });

    for (const sport_experience of sport_experience_types) {
        test(`[pozitive] Создание нового клиента c sport_experience = ${sport_experience}`, async ({ request }) => {
            const response = await request.post(
                `${api.urls.base_url_api}${api.path.users}`,
                {
                    headers: {
                        "Authorization": `${api.tokens.test}`
                    },
                    data: {...await getBaseUserData(sport_experience)},
                });

            expect(response.status(), await response.text()).toBe(200);
        });
    };


    test("[negative] Создание нового клиента без поля 'password'", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.path.users}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {
                        request_id: await getRandomRequestId(),
                        session_id: await getRandomSessionId(),
                        request_source: "crm",
                        data: {
                            email: await getRandomEmail(),
                            name: "Гладиолус",
                            last_name: "Гладиолусов",
                            middle_name: "Гладиолусович",
                            sex: "male",
                            phone: await getRandomPhone(),
                            birthday: "1993-02-05",
                            lang: "ru",
                            user_foto_id: 4,
                            home_club_id: 5,
                            club_access: false,
                            admin_panel_access: false,
                            class_registration_access: false,
                            sport_experience: "Нет опыта" 
                        }
                }
            });

        expect(response.status(), await response.text()).toBe(200);
    });

    test("[positive] Создание нового клиента(запрос из crm)", async ({ request }) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.path.users}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {
                        request_id: "a8f58625-04c6-4b64-9d9e-c72d02dd8b37",
                        session_id: "62efb5ef-5222-4c8e-9b27-8b011552e944",
                        request_source: "crm",
                        data: {
                            sport_experience: "Нет опыта",
                            last_name: "Гладиолусов",
                            name: "Гладиолус",
                            middle_name: "Гладиолусович",
                            sex: "male",
                            phone: await getRandomPhone(),
                            email: await getRandomEmail(),
                            home_club_id: 5,
                            verification_token: "09a83bbf-6a4c-43d7-bc88-b7d553174c75",
                            birthday: "1993-02-05"
                        },
                }
            });

        expect(response.status(), await response.text()).toBe(200);
    });
});