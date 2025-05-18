export interface DayData {
  gregorianDate: Date;
  gregorianDay: number;
  gregorianMonth: number;
  gregorianYear: number;
  hebrewDay: string;
  hebrewMonth: string;
  hebrewYear: string;
  fullHebrewDate: string;
  isToday: boolean;
}

export interface HebrewMonthData {
  hebrewMonthName: string;
  hebrewYear: string;
  gregorianMonthName: string;
  gregorianYear: string;
  days: DayData[];
}