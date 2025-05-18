import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { DayData } from '../types/calendar';
import { formatGregorianDate } from '../utils/dateFormatters';
import { useToast } from '../context/ToastContext';

interface CalendarDayProps {
  day: DayData;
  showDateBefore?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, showDateBefore = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useToast();
  
  const isToday = day.isToday;
  
  const handleCopyHebrewDate = () => {
    navigator.clipboard.writeText(day.fullHebrewDate);
    showToast('התאריך העברי הועתק');
  };
  
  const handleCopyGregorianDate = () => {
    navigator.clipboard.writeText(formatGregorianDate(day.gregorianDate));
    showToast('התאריך הלועזי הועתק');
  };
  
  // For empty cells at the beginning of the calendar
  if (!day.hebrewDay) {
    return <div className="h-24 bg-transparent"></div>;
  }
  
  return (
    <div 
      className={`h-24 border rounded-lg flex flex-col relative transition-all
        ${isToday ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}
        ${showDateBefore ? 'mt-2' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start p-2">
        <span className="font-bold text-lg text-gray-800">{day.hebrewDay}</span>
        <span className="text-xs text-gray-600">{`${day.gregorianDay}/${day.gregorianMonth}/${day.gregorianYear}`}</span>
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-1.5 transition-opacity duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <button 
          className="p-1.5 bg-blue-600 text-white rounded flex items-center text-xs"
          onClick={handleCopyHebrewDate}
          title="העתק תאריך עברי"
        >
          <Copy className="w-3 h-3 mr-1" />
          עברי
        </button>
        <button 
          className="p-1.5 bg-gray-600 text-white rounded flex items-center text-xs"
          onClick={handleCopyGregorianDate}
          title="העתק תאריך לועזי"
        >
          <Copy className="w-3 h-3 mr-1" />
          לועזי
        </button>
      </div>
    </div>
  );
};

export default CalendarDay;