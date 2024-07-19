'use client'

import React, { useEffect, useState } from 'react'
import { useSummary } from '@/contexts/SummaryContext'
import Spinner from '@/components/Spinner' 
import { useRouter } from 'next/navigation'
import SummaryDialog from '@/components/Dialog/SummaryDialog'
import SummaryCard from '@/components/SummaryCard'

const Page = () => {
    const { summaries, loading, getAllSummaries, } = useSummary()
    const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        getAllSummaries()
    }, []) 

    if (loading) {
        return <Spinner />
    }

    const handleClick = (id) => {
        router.push(`/dashboard/summary/${id}`)
    }

    return (
        <div className="container mx-auto py-4 lg:pr-16 lg:pl-4 px-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-thin lg:mb-5 text-gray-300">Recent Summaries</h1>
                <button 
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-blue-700 hover:bg-blue-900 text-white font-thin px-4 py-2 rounded"
                >
                    Create New 
                </button>
            </div>
            {summaries.length > 0 ? (
                <div className="space-y-4">
                    {summaries.map((summary) => (
                        <SummaryCard key={summary.id} summary={summary} onClick={handleClick} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No summaries found.</p>
            )}
            <SummaryDialog 
                isOpen={isDialogOpen} 
                closeDialog={() => {
                    setIsDialogOpen(false)}}
                
            />
        </div>
    )
}

export default Page