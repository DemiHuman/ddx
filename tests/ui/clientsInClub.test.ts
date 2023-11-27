import test from "@playwright/test"
import authCRMTestData from "@data/authCRM.json"
import crmUrl from "api.json"

test.use({headless: false})
test.describe("Тесты на пункт меню 'Клиенты в клубе'", async () => {
    test("Успешный переход на пункт меню 'Клиенты в клубе'", async ({ page}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(crmUrl.urls.base_url_crm);
        });

        await test.step("Заполнить форму авторизации и нажать найти", async () => {
            // Пример работы с CSS-селекторами
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole("button", { name: 'Войти'}).click();
        });

        await test.step("Нажать на пункт меню 'Клиенты в клубе'", async () => {
            await page.getByText("Клиенты в клубе").click();
        });

        await test.step("Проверть отобржение надписи 'Сейчас в клубе'", async () => {
            await page.getByText("Сейчас в клубе").waitFor({state: 'visible', timeout: 3000});
        });
    });
})