import test from "@playwright/test"
import authCRMTestData from "@data/authCRM.json"

test.use({headless: false})
test.describe("Тесты на авторизацию в CRM", async () => {
    test("Успешная авторизация в CRM", async ({ page}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto('https://crm.test.ddxfitness.ru');
        });

        await test.step("Заполнить форму авторизации и нажать найти", async () => {
            // Пример работы с CSS-селекторами
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole("button", { name: 'Войти'}).click();
        });

        await test.step("Заполнить форму авторизации и нажать найти", async () => {
            // Пример работы с xpath
            await page.locator("//input[@data-testid='phone-input']").waitFor({state: 'visible', timeout: 3000});
        });
    });
})