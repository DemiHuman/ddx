import { getRandomEmail, getRandomNumber, getRandomPhone, getRandomRequestId, getRandomSessionId } from "../utils/randomUtils";

export async function getBaseParameters(): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm"
            };
};

export async function getBaseUserData(sport_experience: string = "Нет опыта"): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm",
                data: {
                    email: await getRandomEmail(),
                    name: "Гладиолус",
                    last_name: "Гладиолусов",
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
                    sport_experience: sport_experience
                }};
};

export async function getBaseUserDataWithDetailingClubId(club_id: number): Promise<object> {
    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
                request_source: "crm",
                data: {
                    email: await getRandomEmail(),
                    name: "Гладиолус",
                    last_name: "Гладиолусов",
                    middle_name: "Гладиолусович",
                    sex: "male",
                    password: "qwerty123",
                    phone: await getRandomPhone(),
                    birthday: "1993-02-05",
                    lang: "ru",
                    user_foto_id: 4,
                    home_club_id: club_id,
                    club_access: false,
                    admin_panel_access: false,
                    class_registration_access: false,
                    sport_experience: "Нет опыта"
                }};
};


export async function getBaseUserDataWithoutPasswordFild(sport_experience?: string): Promise<object> {
    let sprt_experience: string = "Нет опыта";
    if(sport_experience != null) sprt_experience = sport_experience;

    return { 
                session_id: await getRandomSessionId(),
                request_id: await getRandomRequestId(),
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
                    sport_experience: sprt_experience 
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
                user_id: 1319472,
                type: "notify"
            }]
    }
};

export async function getUserPaymentPlansData(club_id: number): Promise<object> {
    return {   
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: "crm",
        start_date: "2023-11-20",
        payment_plan_id: 18,
        club_id: club_id,
        verification_token: "cdcd4d4b-91b1-4c8b-9a5a-c1ebb65b5392",
        discount_id: 199//,
        //discount_code_id: 222
    }
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