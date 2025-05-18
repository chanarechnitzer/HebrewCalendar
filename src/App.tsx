import React, { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import { getHebrewMonth, getNextMonth, getPreviousMonth } from './utils/calendarUtils';
import { HebrewMonthData } from './types/calendar';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hebrewMonthData, setHebrewMonthData] = useState<HebrewMonthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHebrewMonth = async () => {
      setIsLoading(true);
      try {
        const data = await getHebrewMonth(currentDate);
        setHebrewMonthData(data);
      } catch (error) {
        console.error('Error fetching Hebrew month:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHebrewMonth();
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => getPreviousMonth(prevDate));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => getNextMonth(prevDate));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <ToastProvider>
      <div dir="rtl" className="min-h-screen bg-sky-50 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <CalendarHeader 
            hebrewMonth={hebrewMonthData?.hebrewMonthName || ''} 
            hebrewYear={hebrewMonthData?.hebrewYear || ''} 
            gregorianMonth={hebrewMonthData?.gregorianMonthName || ''} 
            gregorianYear={hebrewMonthData?.gregorianYear || ''}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onTodayClick={handleTodayClick}
            isLoading={isLoading}
          />
          
          <CalendarGrid 
            days={hebrewMonthData?.days || []} 
            isLoading={isLoading}
          />
        </div>
        
        <footer className="text-gray-500 text-sm">
          © כל הזכויות שמורות SMART OFFICE 0527668902
        </footer>
        <Toast />
      </div>
    </ToastProvider>
  );
}

export default App;