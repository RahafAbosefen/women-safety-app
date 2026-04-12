import ApiBase from "@/services/ApiBase";
import {USERS_API} from "@/constants/api";

export const getCurrentUser = async (filters: any): Promise<Response> => {
    const token = "token";
    const response = await fetch(USERS_API, {
        method: "GET",
        body: filters,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export const getCurrentUser2 = async (filters: any) => {
    return await ApiBase.post(USERS_API, filters);
}
export const sendContactMessage = async (payload: any) => {
    return await ApiBase.post('/contacts', payload);
}