import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resumeFile", resumeFile);
        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/${interviewId}`);
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