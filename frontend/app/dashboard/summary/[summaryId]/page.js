'use client'
import React, { useEffect, useState } from 'react'
import { useSummary } from '@/contexts/SummaryContext'
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

import Spinner from '@/components/Spinner'
import { downloadSummaryPDF } from '@/utils/pdfUtils'

const SummaryPage = () => {
  const { getSummaryById } = useSummary()
  const { summaryId } = useParams()
  const router = useRouter()
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedSummary = await getSummaryById(summaryId)
        setSummary(fetchedSummary)
      } catch (error) {
        console.error('Error fetching summary:', error)
        setError('Failed to fetch summary. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    if (summaryId) {
      fetchSummary()
    }
  }, [summaryId])

  const handleBack = () => {
    router.push('/dashboard/summary')
  }

  const handleDownload = () => {
    downloadSummaryPDF(summary)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div className="text-red-500 flex items-center justify-center">{error}</div>
  }

  if (!summary) {
    return <div>No summary found.</div>
  }

  return (
    <div className="container mx-auto sm:p-4 p-2 text-gray-200 lg:pr-20">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleBack} className="text-white hover:text-gray-300 font-thin text-3xl py-2 px-4 -full">
            <FaArrowLeft />
        </button>
        <button onClick={handleDownload} className="bg-green-700 hover:bg-green-600 text-white font-thin sm:py-2 sm:px-4 px-2 py-2 rounded-full flex flex-row items-center justify-center">
        <IoMdDownload />
         <p>Download Report</p>
        </button>
      </div>
      <h1 className="sm:text-5xl lg:text-6xl text-3xl font-thin mb-4 ml-4">{summary.mainTopic || 'Untitled Summary'}</h1>
      <div className='flex justify-between'>
        <h2 className="text-md font-thin ml-4">Sentiment: {summary.sentiment}</h2>
      </div>
      <div className=" shadow-md rounded-lg p-6 sm:mt-3">
        <h2 className="sm:text-5xl lg:text-6xl text-3xl font-thin mb-2">Subtopics</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 text-sm font-thin sm:text-lg">
          {summary.subtopics.map((subtopic, index) => (
            <li key={index}>{subtopic}</li>
          ))}
        </ul>
        <h2 className="sm:text-5xl lg:text-6xl text-3xl font-thin mb-2 mt-3">Key Insights</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 text-sm font-thin sm:text-lg">
          {summary.keyInsights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
        <h2 className="sm:text-5xl lg:text-6xl text-3xl font-thin mb-2 mt-3">Keywords</h2>
        <ul className="list-disc list-inside mb-4 text-gray-300 text-sm font-thin sm:text-lg">
          {summary.keywords.map((keyword, index) => <li key={index}>{keyword}</li>)}
        </ul>
        <h2 className="sm:text-5xl lg:text-6xl text-3xl font-thin mb-2 mt-8">Summary</h2>
        <p className="text-gray-300 mb-4 text-sm font-thin sm:text-lg">{summary.summary}</p>
        <div className="text-sm text-gray-400 mb-4 mt-3">
          <p>Created: {new Date(summary.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
