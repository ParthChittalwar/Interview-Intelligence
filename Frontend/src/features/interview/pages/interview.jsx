import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
    {
        id: 'technical',
        label: 'Technical Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: 'behavioral',
        label: 'Behavioral Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: 'roadmap',
        label: 'Road Map',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        )
    }
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-200'>
            <div className='flex cursor-pointer items-start gap-3' onClick={() => setOpen(o => !o)}>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white'>Q{index + 1}</span>
                <p className='flex-1 text-base font-medium text-slate-700'>{item.question}</p>
                <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='mt-4 space-y-4 border-t border-slate-200 pt-4'>
                    <div className='space-y-2'>
                        <span className='inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700'>Intention</span>
                        <p className='text-sm leading-6 text-slate-600'>{item.intention}</p>
                    </div>
                    <div className='space-y-2'>
                        <span className='inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700'>Model Answer</span>
                        <p className='text-sm leading-6 text-slate-600'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm'>
        <div className='mb-4 flex flex-wrap items-center gap-3'>
            <span className='rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white'>Day {day.day}</span>
            <h3 className='text-lg font-semibold text-slate-800'>{day.focus}</h3>
        </div>
        <ul className='space-y-3 text-sm text-slate-600'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2'>
                    <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400' />
                    <span>{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
                <h1 className='text-xl font-semibold text-slate-700'>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor = report.matchScore >= 80
        ? 'border-emerald-500 text-emerald-600'
        : report.matchScore >= 60
            ? 'border-amber-500 text-amber-600'
            : 'border-rose-500 text-rose-600'

    const severityClassMap = {
        high: 'bg-rose-100 text-rose-700',
        medium: 'bg-amber-100 text-amber-700',
        low: 'bg-emerald-100 text-emerald-700'
    }

    return (
        <div className='min-h-screen bg-slate-50 px-4 py-6 lg:px-6'>
            <div className='mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row'>
                <nav className='flex w-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72'>
                    <div>
                        <p className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Sections</p>
                        <div className='space-y-2'>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeNav === item.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className='flex h-8 w-8 items-center justify-center rounded-xl bg-white/10'>{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className='mt-6 flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
                    >
                        <svg className='mr-3 h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
                        </svg>
                        Download Resume
                    </button>
                </nav>

                <div className='hidden w-px bg-slate-200 lg:block' />

                <main className='flex-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-8'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='mb-6 flex items-center justify-between'>
                                <h2 className='text-2xl font-semibold text-slate-800'>Technical Questions</h2>
                                <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='space-y-4'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='mb-6 flex items-center justify-between'>
                                <h2 className='text-2xl font-semibold text-slate-800'>Behavioral Questions</h2>
                                <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='space-y-4'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='mb-6 flex items-center justify-between'>
                                <h2 className='text-2xl font-semibold text-slate-800'>Preparation Road Map</h2>
                                <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='space-y-4'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='hidden w-px bg-slate-200 lg:block' />

                <aside className='w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72'>
                    <div className='space-y-4'>
                        <div className='rounded-2xl bg-slate-50 p-5'>
                            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Match Score</p>
                            <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 ${scoreColor}`}>
                                <span className='text-2xl font-semibold'>{report.matchScore}</span>
                                <span className='ml-1 text-sm font-medium'>%</span>
                            </div>
                            <p className='mt-4 text-center text-sm text-slate-500'>Strong match for this role</p>
                        </div>

                        <div className='rounded-2xl bg-slate-50 p-5'>
                            <p className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Skill Gaps</p>
                            <div className='flex flex-wrap gap-2'>
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`rounded-full px-3 py-2 text-sm font-medium ${severityClassMap[gap.severity] || 'bg-slate-100 text-slate-700'}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview