import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const interview = useInterview() || {}
    const { loading = false, generateReport, reports = [] } = interview
    const safeReports = Array.isArray(reports) ? reports : []
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        if (typeof generateReport !== 'function') return

        const resumeFile = resumeInputRef.current?.files?.[0] ?? null

        try {
            await generateReport({
                jobDescription,
                selfDescription,
                resumeFile,
            })
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-slate-950 px-4'>
                <h1 className='text-xl font-semibold text-slate-100'>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-10'>

            {/* Page Header */}
            <header className='mx-auto max-w-5xl text-center mb-10'>
                <h1 className='text-4xl font-semibold leading-tight tracking-tight sm:text-5xl'>
                    Create Your Custom <span className='text-cyan-400'>Interview Plan</span>
                </h1>
                <p className='mx-auto mt-4 max-w-3xl text-sm text-slate-400 sm:text-base'>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='mx-auto max-w-6xl overflow-hidden rounded-4xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/30'>
                <div className='grid gap-6 px-4 py-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-8'>

                    {/* Left Panel - Job Description */}
                    <div className='rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6'>
                        <div className='mb-5 flex items-start justify-between gap-4'>
                            <div className='flex items-center gap-3'>
                                <span className='inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='7' width='20' height='14' rx='2' ry='2' /><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' /></svg>
                                </span>
                                <div>
                                    <h2 className='text-xl font-semibold'>Target Job Description</h2>
                                    <span className='inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300'>Required</span>
                                </div>
                            </div>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='min-h-65 w-full resize-none rounded-3xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-500/20'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='mt-3 text-sm text-slate-500'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Right Panel - Profile */}
                    <div className='rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6'>
                        <div className='mb-6 flex items-center gap-3'>
                            <span className='inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' /><circle cx='12' cy='7' r='4' /></svg>
                            </span>
                            <h2 className='text-xl font-semibold'>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='mb-7'>
                            <div className='mb-4 flex items-center justify-between text-sm font-medium text-slate-200'>
                                <span>Upload Resume</span>
                                <span className='rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300'>Best Results</span>
                            </div>
                            <label className='group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900 px-5 py-8 text-center transition hover:border-cyan-400 hover:bg-slate-900/95'>
                                <span className='mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='16 16 12 12 8 16' /><line x1='12' y1='12' x2='12' y2='21' /><path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' /></svg>
                                </span>
                                <p className='text-sm font-semibold text-slate-100'>Click to upload or drag & drop</p>
                                <p className='mt-1 text-xs text-slate-500'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='mb-6 flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.35em] text-slate-500'>
                            <span className='h-px flex-1 bg-slate-800' />
                            OR
                            <span className='h-px flex-1 bg-slate-800' />
                        </div>

                        {/* Quick Self-Description */}
                        <div className='mb-6'>
                            <label className='mb-3 block text-sm font-medium text-slate-200' htmlFor='selfDescription'>
                                Quick Self-Description
                            </label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                className='min-h-45 w-full resize-none rounded-3xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-500/20'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='flex items-start gap-3 rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300'>
                            <span className='mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-cyan-300'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'><circle cx='12' cy='12' r='10' /><line x1='12' y1='8' x2='12' y2='12' stroke='#1a1f27' strokeWidth='2' /><line x1='12' y1='16' x2='12.01' y2='16' stroke='#1a1f27' strokeWidth='2' /></svg>
                            </span>
                            <p>Either a <strong className='text-slate-100'>Resume</strong> or a <strong className='text-slate-100'>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='flex flex-col gap-4 border-t border-slate-800 bg-slate-950/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
                    <span className='text-sm text-slate-400'>AI-Powered Strategy Generation · Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='mx-auto mt-10 max-w-6xl'>
                    <h2 className='text-2xl font-semibold text-slate-100'>My Recent Interview Plans</h2>
                    <ul className='mt-6 grid gap-4 sm:grid-cols-2'>
                        {reports.map(report => (
                            <li key={report._id} onClick={() => navigate(`/interview/${report._id}`)} className='group cursor-pointer rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 transition hover:border-cyan-400 hover:bg-slate-900'>
                                <h3 className='text-lg font-semibold text-slate-100'>{report.title || 'Untitled Position'}</h3>
                                <p className='mt-2 text-sm text-slate-500'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${report.matchScore >= 80 ? 'bg-emerald-500/10 text-emerald-300' : report.matchScore >= 60 ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='mx-auto mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-500'>
                <a href='#' className='transition hover:text-slate-100'>Privacy Policy</a>
                <a href='#' className='transition hover:text-slate-100'>Terms of Service</a>
                <a href='#' className='transition hover:text-slate-100'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home