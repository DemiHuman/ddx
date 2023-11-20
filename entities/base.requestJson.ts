import {getRandomRequestId, getRandomSessionId} from "@utils/randomUtils";
import {RequestSource} from "@libs/requestSource";

export interface BaseRequestJson<T = {}> {
    session_id: string;
    request_id: string;
    request_source: string;
    data?: T;
}

export const getBaseRequestJson = async (): Promise<BaseRequestJson> => {
    return {
        session_id: await getRandomSessionId(),
        request_id: await getRandomRequestId(),
        request_source: RequestSource.CRM
    };
}