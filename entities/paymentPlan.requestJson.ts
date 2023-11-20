import {BaseRequestJson} from "@entities/base.requestJson";
import {getRandomRequestId, getRandomSessionId} from "@utils/randomUtils";
import {RequestSource} from "@libs/requestSource";

export interface PaymentPlanDataRequestJson extends BaseRequestJson {
    user_id: number,
    club_id: number,
    payment_plan_id: number,
    discount_id: number,
    start_date: string,
    verification_token: string
}

export const getPaymentPlanRequestJson = async (userId: number, clubId: number, paymentPlanId: number = 18): Promise<PaymentPlanDataRequestJson> => {
    return {
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: RequestSource.CRM,
        user_id: userId,
        club_id: clubId,
        payment_plan_id: paymentPlanId,
        discount_id: 199,
        start_date: "2023-11-30",
        verification_token: "91993aea-7129-4636-ad1e-412abf611316"
    };
};