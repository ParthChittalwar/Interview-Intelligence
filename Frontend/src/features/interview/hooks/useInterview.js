import { getAllInterviewReports, generateInterviewReport, getInterviewReportById , generateResumePdf } from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useNavigate, useParams } from "react-router-dom";

export const useInterview = () => {

    const context = useContext(InterviewContext);
    const { id } = useParams();
    const navigate = useNavigate();

    if(!context) {
        throw new Error("useInterview must be used within a InterviewProvider");
    }

    const { loading , setLoading , reports , setReports , report , setReport , resumePdf , setResumePdf } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            navigate(`/interview/${response.interviewReport._id}`);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getReport = async () => {
        setLoading(true);
        let response = null;
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getResumePdf = async (interviewId) => {
    setLoading(true);

    try {
        const response = await generateResumePdf(interviewId);

        const url = window.URL.createObjectURL(
            new Blob([response], { type: "application/pdf" })
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = `resume_${interviewId}.pdf`;
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        link.remove();
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        if (id) {
            getReportById(id);
        } else {
            getReport();
        }
    }, [id]);

    return { loading, report, reports, getReport, generateReport, getResumePdf };


}