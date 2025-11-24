export enum ActivityType {
  SIGHTSEEING = 'SIGHTSEEING',
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  FLIGHT = 'FLIGHT',
  HOTEL = 'HOTEL',
  SHOPPING = 'SHOPPING',
  OTHER = 'OTHER'
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  location?: string;
  type: ActivityType;
  description?: string;
  notes?: string;
  isGap?: boolean; // If true, this is a free slot
}

export interface DaySchedule {
  date: string;
  dayOfWeek: string;
  locationName: string; // e.g., Tokyo, Karuizawa
  weatherForecast?: {
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rain' | 'snow';
  };
  activities: Activity[];
  hotel?: string;
}

export interface Expense {
  id: string;
  item: string;
  amount: number;
  currency: 'JPY' | 'HKD' | 'TWD';
  category: string;
}

export interface AIEnrichment {
  activityId: string;
  tips: string;
  mustEat?: string[];
  mustBuy?: string[];
  history?: string;
}