import React from 'react';
import CalendarDay from './CalendarDay';
import { DayData } from '../types/calendar';

interface CalendarGridProps {
  days: DayData[];
  isLoading: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, isLoading }) => {
  const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  // Generate empty skeleton for loading state
  const skeletonDays = Array(35).fill(null);

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, index) => (
          <div 
            key={index} 
            className="text-center font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {isLoading
          ? skeletonDays.map((_, index) => (
              <div 
                key={index} 
                className="h-24 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))
          : days.map((day, index) => (
              <CalendarDay 
                key={index} 
                day={day}
                showDateBefore={index > 0 && days[index-1]?.gregorianDay > day.gregorianDay}
              />
            ))
        }
      </div>
    </div>
  );
};

export default CalendarGrid;