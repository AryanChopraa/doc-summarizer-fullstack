import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSummary } from '@/contexts/SummaryContext';
import {ConfirmationDialog} from '@/components/Dialog/ConfirmationDialog';



const SummaryCard = ({ summary, onClick }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { deleteSummarybyId } = useSummary();

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        deleteSummarybyId(summary.id);
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="bg-gray-900 text-gray-400 rounded-xl shadow hover:shadow-md transition-shadow p-8 flex flex-col gap-4 h-full font-poppins hover:shadow-blue-500 relative">
            <div className="absolute top-10 right-4">
                <button 
                    className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    onClick={handleDeleteClick}
                    aria-label="Delete summary"
                >
                    <FaTrash />
                </button>
            </div>

            <button onClick={() => onClick(summary.id)} className="w-full text-left flex-grow">
                <h2 className="text-3xl font-thin truncate text-gray-300">{summary.mainTopic || 'Untitled Summary'}</h2>
                <p className="mt-3 font-thin"><span className="font-normal">Sentiment:</span> {summary.sentiment}</p>
                <p className="mt-3 font-thin"><span className="font-normal">Key Insights:</span> {summary.keyInsights.slice(0, 2).join(', ')}...</p>
                <p className="mt-3 line-clamp-3 font-thin"><span className="font-sm font-thin">Summary: </span>{summary.summary}</p>
            </button>
            <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500 font-thin">Id: {summary.id}</span>
                <span className="text-xs text-gray-500 font-thin">
                    Date: {new Date(summary.createdAt).toLocaleString()}
                </span>
            </div>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default SummaryCard;
