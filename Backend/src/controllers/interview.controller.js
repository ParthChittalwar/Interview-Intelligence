const pdfParse = require('pdf-parse');
const { generateInterviewReport } = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');


const generateInterviewReportController = async (req, res) => {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body


    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    console.log("AI Response:");
    console.dir(interViewReportByAi, { depth: null });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

const getInterviewReportByIdController = async (req, res) => {

    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId , user: req.user.id });

    if(!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

const getAllInterviewReportController = async (req, res) => {

    const interviewReports = await (await interviewReportModel.find({ user: req.user.id })).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

const generateResumePdfController = async (req, res) => {

    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId , user: req.user.id });

    if(!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const {resume , selfDescription , jobDescription} = interviewReport;

    const pdfBuffer = await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription
    })

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume_${interviewReportId}.pdf'
    });

    res.status(200).send(pdfBuffer);
}



module.exports = {
    generateInterviewReportController ,
    getInterviewReportByIdController,
    getAllInterviewReportController,
    generateResumePdfController
}