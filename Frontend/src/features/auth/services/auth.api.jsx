import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const handleResponse = (response) => {
    if (!response || typeof response.data === "undefined") {
        throw new Error("Invalid API response");
    }
    return response.data;
};

const handleError = (error) => {
    if (error.response && error.response.data) {
        const data = error.response.data;
        const message = data.message || data.error || JSON.stringify(data);
        throw new Error(message || "Request failed with response error");
    }
    if (error.request) {
        throw new Error("No response received from server");
    }
    throw new Error(error.message || "Request failed");
};

export const register = async ({username,email,password}) => {
    try {
        const response = await api.post("/api/auth/register", {username,email,password});
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const login = async ({email,password}) => {
    try {
        const response = await api.post("/api/auth/login", {email,password});
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const logout = async () => {
    try {
        const response = await api.get("/api/auth/logout");
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const getme = async () => {
    try {
        const response = await api.get("/api/auth/getme");
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};