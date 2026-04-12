import axios from 'axios';
import StorageService from "@/services/StorageService";

export const API_URL = "https://69a3f823611ecf5bfc23e67f.mockapi.io";

const handleErrors = async (err) => {
    if (err?.response?.status === 401) {
        console.log("Unauthorize");
    } else if (err?.response?.status === 403) {
        console.log("You don't have permission to access this resource");
    } else if (err?.response?.status === 500) {
        console.log("Check from your server");
    } else {
        console.log(err);
    }
    return Promise.reject(err);
};

const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
    timeout: 30000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await StorageService.getToken();
        const tokenType = "Bearer";
        if (token) {
            config.headers.Authorization = `${tokenType} ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response
    },
    handleErrors
);

export default axiosInstance;