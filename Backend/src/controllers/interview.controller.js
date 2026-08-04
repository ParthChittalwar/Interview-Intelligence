const pdfParse = require('pdf-parse');
const { generateInterviewReport , generateResumePdf } = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');


const generateInterviewReportController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF is required"
            });
        }

        if (!req.user?.id) {
            return res.status(400).json({
                message: "User authentication required."
            });
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const resumeText = resumeContent?.text || '';
        const { selfDescription, jobDescription } = req.body || {};

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        console.log("AI Response:");
        console.dir(interViewReportByAi, { depth: null });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate interview report."
        });
    }
}

const getInterviewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params || {};

        if (!interviewId) {
            return res.status(400).json({
                message: "Interview report id is required."
            });
        }

        if (!req.user?.id) {
            return res.status(400).json({
                message: "User authentication required."
            });
        }

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch interview report."
        });
    }
}

const getAllInterviewReportController = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(400).json({
                message: "User authentication required."
            });
        }

        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch interview reports."
        });
    }
}

const generateResumePdfController = async (req, res) => {
    try {
        const { interviewReportId } = req.params || {};

        if (!interviewReportId) {
            return res.status(400).json({
                message: "Interview report id is required."
            });
        }

        if (!req.user?.id) {
            return res.status(400).json({
                message: "User authentication required."
            });
        }

        const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        const { resume, selfDescription, jobDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            selfDescription,
            jobDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`
        });

        res.status(200).send(pdfBuffer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate resume PDF."
        });
    }
}

module.exports = {
    generateInterviewReportController ,
    getInterviewReportByIdController,
    getAllInterviewReportController,
    generateResumePdfController
}