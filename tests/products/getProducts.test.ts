import {test} from '@playwright/test';
import {getBaseRequestJson} from "@entities/base.requestJson";
import ProductsRequest from "@requests/products.request";
import {Statuses} from "@libs/statuses";

test.describe("API тесты на получение списока продуктов", () => {
    test("[pozitive] Получение списока продуктов", async ({ request }) => {
        const requestBody = await getBaseRequestJson();

        await new ProductsRequest(request).getProducts(Statuses.OK, requestBody);
    });
});