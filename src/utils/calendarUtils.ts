import { HDate, months, gematriya } from '@hebcal/core';
import { HebrewMonthData, DayData } from '../types/calendar';

// Helper to get Hebrew month name in Hebrew
const getHebrewMonthNameHebrew = (month: number): string => {
  const hebrewMonthNames: { [key: number]: string } = {
    1: 'ניסן',
    2: 'אייר',
    3: 'סיון',
    4: 'תמוז',
    5: 'אב',
    6: 'אלול',
    7: 'תשרי',
    8: 'חשון',
    9: 'כסלו',
    10: 'טבת',
    11: 'שבט',
    12: 'אדר',
    13: 'אדר א׳',
    14: 'אדר ב׳'
  };
  
  return hebrewMonthNames[month] || '';
};

// Helper to get Gregorian month name in Hebrew
const getGregorianMonthNameHebrew = (month: number): string => {
  const gregorianMonthNames: string[] = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  return gregorianMonthNames[month] || '';
};

// Format Hebrew year in Hebrew letters
const formatHebrewYear = (year: number): string => {
  return gematriya(year);
};

// Generate calendar grid for a given month
export const getHebrewMonth = async (date: Date): Promise<HebrewMonthData> => {
  // Get the first day of the month
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  
  // Get Hebrew date for the first day
  const hdate = new HDate(firstDay);
  
  // Get Hebrew month and year
  const hebrewMonth = hdate.getMonth();
  const hebrewYear = hdate.getFullYear();
  
  // Get Hebrew month name and year in Hebrew
  const hebrewMonthName = getHebrewMonthNameHebrew(hebrewMonth);
  const hebrewYearFormatted = formatHebrewYear(hebrewYear);
  
  // Get Gregorian month and year
  const gregorianMonth = firstDay.getMonth();
  const gregorianYear = firstDay.getFullYear();
  const gregorianMonthName = getGregorianMonthNameHebrew(gregorianMonth);
  
  // Get first day of the week of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();
  
  // Get number of days in the month
  const daysInMonth = new Date(gregorianYear, gregorianMonth + 1, 0).getDate();
  
  // Current date for highlighting today
  const today = new Date();
  const isCurrentMonth = today.getMonth() === gregorianMonth && today.getFullYear() === gregorianYear;
  
  // Generate calendar days
  const days: DayData[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      gregorianDate: new Date(0),
      gregorianDay: 0,
      gregorianMonth: 0,
      gregorianYear: 0,
      hebrewDay: '',
      hebrewMonth: '',
      hebrewYear: '',
      fullHebrewDate: '',
      isToday: false,
    });
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(gregorianYear, gregorianMonth, day);
    const currentHDate = new HDate(currentDate);
    
    // Check if it's today
    const isToday = isCurrentMonth && today.getDate() === day;
    
    // Format Hebrew day in Hebrew letters
    const hebrewDay = gematriya(currentHDate.getDate());
    
    // Format full Hebrew date (day + month + year)
    const fullHebrewDate = `${hebrewDay} ${getHebrewMonthNameHebrew(currentHDate.getMonth())} ${formatHebrewYear(currentHDate.getFullYear())}`;
    
    days.push({
      gregorianDate: currentDate,
      gregorianDay: day,
      gregorianMonth: gregorianMonth + 1,
      gregorianYear: gregorianYear,
      hebrewDay,
      hebrewMonth: getHebrewMonthNameHebrew(currentHDate.getMonth()),
      hebrewYear: formatHebrewYear(currentHDate.getFullYear()),
      fullHebrewDate,
      isToday,
    });
  }
  
  return {
    hebrewMonthName,
    hebrewYear: hebrewYearFormatted,
    gregorianMonthName,
    gregorianYear: String(gregorianYear),
    days,
  };
};

// Get previous month
export const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

// Get next month
export const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};