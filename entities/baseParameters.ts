import { getRandomEmail, getRandomFirstName, getRandomLastName, getRandomNumber, getRandomPhone, getRandomRequestId, getRandomSessionId } from "@utils/randomUtils";
import {RequestSource} from "@libs/requestSource";
import {SportExperience} from "@libs/sportExperience";
import userTestData from "@data/user.json"

export async function getBaseParameters(): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: RequestSource.CRM
            };
};

export async function getBaseUserData(sportExperience: string = SportExperience.WITHOUT_EXPERIENCE): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: RequestSource.CRM,
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
                    middle_name: userTestData.middleName,
                    sex: userTestData.sex.male,
                    password: userTestData.password,
                    phone: await getRandomPhone(),
                    birthday: userTestData.birthday,
                    lang: userTestData.lang,
                    user_foto_id: userTestData.userPhotoId,
                    home_club_id: userTestData.home_club_id,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: sportExperience
                }};
};

export async function getBaseUserDataWithDetailingClubId(clubId: number): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: RequestSource.CRM,
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
                    middle_name: userTestData.middleName,
                    sex: userTestData.sex.male,
                    password: userTestData.password,
                    phone: await getRandomPhone(),
                    birthday: userTestData.birthday,
                    lang: userTestData.lang,
                    user_foto_id: userTestData.userPhotoId,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: "Нет опыта"
                }};
};


export async function getBaseUserDataWithoutPasswordFild(sportExperience?: string): Promise<object> {
    let sprtExperience: string = SportExperience.WITHOUT_EXPERIENCE;
    if(sportExperience != null) sprtExperience = sportExperience;

    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: RequestSource.CRM,
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
                    middle_name: userTestData.middleName,
                    sex: userTestData.sex.male,
                    phone: await getRandomPhone(),
                    birthday: userTestData.birthday,
                    lang: userTestData.lang,
                    user_foto_id: userTestData.userPhotoId,
                    home_club_id: userTestData.home_club_id,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: sprtExperience
                }};
};


export async function getBaseCardData(): Promise<object> {
    return { 
            ...await getBaseParameters(),
            data: [{
                access_card_number: await getRandomNumber(),
                user_id: 1319472,
                type: "bracelet",
                is_blocked: false,
                is_lost: false,
                is_deleted: false,
                block_previous_card: false,
                payable: true
            }]};
};

export async function getBaseNoteData(): Promise<object> {
    return {   
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: RequestSource.CRM,
        data: [
            {
                text: "Гладиолус",
                employee_id: 4577,
                user_id: 1329470,
                type: "notify"
            }]
    };
};

export async function getUserPaymentPlansData(clubId: number = 5, paymentPlanId: number = 18): Promise<object> {
    return {   
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: RequestSource.CRM,
        start_date: "2023-11-30",
        payment_plan_id: paymentPlanId,
        club_id: clubId,
        verification_token: "91993aea-7129-4636-ad1e-412abf611316",
        discount_id: 199
    };
};

export async function getPaymentData(
    userId: number, 
    paymentType: string, 
    transactionProvidersId: number | null, 
    transactionGateId: number, 
    paymentProvidersId: number, 
    userPaymentPlanId: number) {
    return {
            ...await getBaseParameters(),
            provider_id: transactionProvidersId,
            type: paymentType,
            gate_id: transactionGateId,
            user_id: userId,
            user_payment_plan_id: userPaymentPlanId,
            currency: "RUB",
            payment_service_id: paymentProvidersId,
            employee_id: 4577,
            fiscal_method: "OrangeData",
            widget_settings: {
                success_page: "https://successpage.ru",
                fault_page: "https://faultpage.ru"
            }
        };
};

export const clubsId = [1, 2, 3, 4, 5];