import ApiBase from "@/api/ApiBase";

export const getUserByEmail = async (email: string) => {
    return await ApiBase.get(`/users?email=${email}`);
}

export const register = async (payload: any) => {
    return await ApiBase.post('/users', payload);
}

export const login = async (payload: any) => {
    return await ApiBase.get(`/users?email=${payload.email}`);
}

export const logout = async () => {
    return await ApiBase.get('/users/logout');
}

export const sendContactMessage = async (payload: any) => {
    return await ApiBase.post('/contacts', payload);
}