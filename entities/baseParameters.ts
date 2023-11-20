import { getRandomEmail, getRandomFirstName, getRandomLastName, getRandomNumber, getRandomPhone, getRandomRequestId, getRandomSessionId } from "@utils/randomUtils";

export async function getBaseParameters(): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm"
            };
};

export async function getBaseUserData(sportExperience: string = "Нет опыта"): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm",
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
                    middle_name: "Гладиолусович",
                    sex: "male",
                    password: "qwerty123",
                    phone: await getRandomPhone(),
                    birthday: "1993-02-05",
                    lang: "ru",
                    user_foto_id: 4,
                    home_club_id: 5,
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
                request_source: "crm",
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
                    middle_name: "Гладиолусович",
                    sex: "male",
                    password: "qwerty123",
                    phone: await getRandomPhone(),
                    birthday: "1993-02-05",
                    lang: "ru",
                    user_foto_id: 4,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: "Нет опыта"
                }};
};


export async function getBaseUserDataWithoutPasswordFild(sportExperience?: string): Promise<object> {
    let sprtExperience: string = "Нет опыта";
    if(sportExperience != null) sprtExperience = sportExperience;

    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm",
                data: {
                    email: await getRandomEmail(),
                    name: await getRandomFirstName(),
                    last_name: await getRandomLastName(),
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
        request_source: "crm",
        data: [
            {
                text: "Гладиолус",
                employee_id: 100473,
                user_id: 1329470,
                type: "notify"
            }]
    };
};

export async function getUserPaymentPlansData(clubId: number = 5, paymentPlanId: number = 18): Promise<object> {
    return {   
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: "crm",
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
            employee_id: 100473,
            fiscal_method: "OrangeData",
            widget_settings: {
                success_page: "https://successpage.ru",
                fault_page: "https://faultpage.ru"
            }
        };
};

export const sportExperienceTypes = [
    "Нет опыта", 
    "0-6 месяцев", 
    "6-12 месяцев", 
    "1-2 года", 
    "2-3 года",
    "3-5 лет",
    "Больше 5 лет"
];

export const clubsId = [1, 2, 3, 4, 5];