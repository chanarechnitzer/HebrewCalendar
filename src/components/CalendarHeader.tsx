import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface CalendarHeaderProps {
  hebrewMonth: string;
  hebrewYear: string;
  gregorianMonth: string;
  gregorianYear: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
  isLoading: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  hebrewMonth,
  hebrewYear,
  gregorianMonth,
  gregorianYear,
  onPreviousMonth,
  onNextMonth,
  onTodayClick,
  isLoading
}) => {
  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onPreviousMonth}
          className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          aria-label="חודש קודם"
          disabled={isLoading}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">
            {isLoading ? 'טוען...' : `${hebrewMonth} ${hebrewYear}`}
          </h1>
          <p className="text-sm opacity-90">
            {isLoading ? '' : `${gregorianMonth} ${gregorianYear}`}
          </p>
        </div>
        
        <button 
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          aria-label="חודש הבא"
          disabled={isLoading}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onTodayClick}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded-full text-sm transition-colors"
          disabled={isLoading}
        >
          <CalendarDays className="w-4 h-4" />
          היום
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;