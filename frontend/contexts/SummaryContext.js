"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/utils/api';

const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllSummaries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/summary/all');
      setSummaries(response.data);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSummary = async (formData) => {
    try {
      const isFile = formData.get('file') !== null;
      const summaryLength = formData.get('summaryLength');
      let response;

      if (isFile) {
        response = await api.post('/summary/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        const text = formData.get('text');
        response = await api.post('/summary/create', { text, summaryLength });
      }


      const { documentId } = response.data;
      return documentId;

    } catch (error) {
      console.error('Error creating summary:', error);
    } finally {
    }
  };

  const getSummaryById = async (summaryId) => {
    try {
      setLoading(true);
      const response = await api.get(`/summary/${summaryId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting summary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteSummarybyId = async (summaryId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/summary/${summaryId}`);
      setSummaries((prevSummaries) => prevSummaries.filter(summary => summary.id !== summaryId));
    } catch (error) {
      console.error('Error deleting summary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SummaryContext.Provider value={{ summaries, loading, createSummary, getSummaryById, getAllSummaries , deleteSummarybyId}}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (context === undefined) {
    throw new Error('useSummary must be used within a SummaryProvider');
  }
  return context;
};
