"use client";

import { useEffect, useState } from 'react';
import { DirectGoogleSheetsService } from '@/lib/directGoogleSheetsService';

export function GoogleSheetsStatus() {
  const [status, setStatus] = useState<'loading' | 'configured' | 'not-configured'>('loading');
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    const checkConfiguration = () => {
      const validation = DirectGoogleSheetsService.validateConfiguration();
      
      if (validation.isValid) {
        setStatus('configured');
      } else {
        setStatus('not-configured');
        setIssues(validation.issues);
      }
    };

    checkConfiguration();
  }, []);

  if (status === 'loading') {
    return null; // Don't show anything while loading
  }

  if (status === 'not-configured') {
    return (
      <div className="fixed bottom-4 right-4 max-w-sm p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg z-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Google Sheets Not Configured
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p className="mb-1">Contact form submissions won't be saved. Please configure:</p>
              <ul className="list-disc list-inside space-y-1">
                {issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
              <p className="mt-2">
                See <code className="bg-yellow-100 px-1 rounded">GOOGLE_SHEETS_SETUP.md</code> for instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm p-4 bg-green-50 border border-green-200 rounded-lg shadow-lg z-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Google Sheets Ready
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Contact form submissions will be saved to Google Sheets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
