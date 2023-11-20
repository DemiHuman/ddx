import {BaseRequestJson} from "@entities/base.requestJson";
import { getRandomFirstName, getRandomLastName, getRandomRequestId, getRandomSessionId } from "@utils/randomUtils";
import {RequestSource} from "@libs/requestSource";
import userTestData from "@data/user.json";
import {SportExperience} from "@libs/sportExperience";

export interface UserDataRequestJson {
    email: string;
    name: string;
    last_name: string;
    middle_name: string;
    sex: string;
    password: string | null;
    phone: string;
    birthday: string;
    lang: string;
    user_foto_id: number;
    home_club_id: number;
    club_access: boolean;
    admin_panel_access: boolean;
    class_registration_access: boolean;
    sport_experience: string;
}

export const getUserRequestJson = async (clubId: number, email: string, phoneNumber: string): Promise<BaseRequestJson<UserDataRequestJson>> => {
    return {
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: RequestSource.CRM,
        data: {
            email: email,
            name: await getRandomFirstName(),
            last_name: await getRandomLastName(),
            middle_name: userTestData.middleName,
            sex: userTestData.sex.male,
            password: userTestData.password,
            phone: phoneNumber,
            birthday: userTestData.birthday,
            lang: userTestData.lang,
            user_foto_id: userTestData.userPhotoId,
            home_club_id: clubId,
            club_access: false,
            admin_panel_access: false,
            class_registration_access: false,
            sport_experience: SportExperience.WITHOUT_EXPERIENCE
        }
    };
}