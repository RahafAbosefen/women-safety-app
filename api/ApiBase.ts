import axios from 'axios';

export const API_URL = "https://69c994cc68edf52c954e9bf5.mockapi.io";

const handleErrors = async (err: any) => {
    if (err?.response?.status === 401) {
        console.log("Unauthorized");
    } else if (err?.response?.status === 403) {
        console.log("You don't have permission to access this resource");
    } else if (err?.response?.status === 500) {
        console.log("Check from your server");
    } else {
        console.log(err);
    }
    return Promise.reject(err);
};

const ApiBase = axios.create({
    baseURL: `${API_URL}`,
    timeout: 30000,
});

ApiBase.interceptors.request.use(
    (config) => {
        const token = "token";
        const tokenType = "Bearer";
        if (token) {
            config.headers.Authorization = `${tokenType} ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (err) => Promise.reject(err)
);

ApiBase.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    handleErrors
);

export default ApiBase;