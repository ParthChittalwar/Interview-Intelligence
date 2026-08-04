import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const parseAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const message = error.response.data?.message || error.response.statusText || error.message;
            return new Error(message || `Request failed with status code ${error.response.status}`);
        }
        if (error.request) {
            return new Error("Network request failed");
        }
        return new Error(error.message || "Request failed");
    }
    return error instanceof Error ? error : new Error(String(error));
};

const validateResponse = (response) => {
    if (!response || typeof response !== "object" || response.status < 200 || response.status >= 300) {
        throw new Error("Invalid response from server");
    }
    if (response.data === undefined || response.data === null) {
        throw new Error("Invalid server response payload");
    }
    return response.data;
};

const validateBlobResponse = (response) => {
    if (!response || typeof response !== "object" || response.status < 200 || response.status >= 300) {
        throw new Error("Invalid response from server");
    }
    const blob = response.data;
    if (!(blob instanceof Blob) || blob.size === 0) {
        throw new Error("Invalid blob response");
    }
    return blob;
};

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resume", resumeFile);
        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return validateResponse(response);
    } catch (error) {
        throw parseAxiosError(error);
    }
};

export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(
            `/api/interview/report/${interviewId}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const generateResumePdf = async (interviewId) => {
    try {
        const response = await api.post(`/api/interview/resume/pdf/${interviewId}`,null, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};