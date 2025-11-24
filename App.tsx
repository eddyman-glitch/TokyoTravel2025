import React, { useState, useEffect } from 'react';
import { INITIAL_ITINERARY } from './constants';
import { DaySchedule, AIEnrichment } from './types';
import ActivityCard from './components/ActivityCard';
import ToolsView from './components/ToolsView';
import WeatherWidget from './components/WeatherWidget';
import { Calendar, LayoutGrid, Map } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'tools'>('itinerary');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [enrichedActivities, setEnrichedActivities] = useState<Record<string, AIEnrichment>>({});
  
  // Scroll to top on day change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedDayIndex]);

  const currentDay: DaySchedule = INITIAL_ITINERARY[selectedDayIndex];

  const handleEnrichment = (data: AIEnrichment) => {
    setEnrichedActivities(prev => ({
      ...prev,
      [data.activityId]: data
    }));
  };

  return (
    <div className="min-h-screen bg-jp-paper text-jp-black font-sans pb-20">
      
      {/* Header / Date Selector */}
      {activeTab === 'itinerary' && (
        <header className="sticky top-0 z-50 bg-jp-paper/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
          <div className="flex overflow-x-auto no-scrollbar py-4 px-4 gap-3 snap-x">
            {INITIAL_ITINERARY.map((day, idx) => {
              const isActive = idx === selectedDayIndex;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`snap-center flex-shrink-0 flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-xl transition-all border ${
                    isActive 
                      ? 'bg-jp-indigo text-white border-jp-indigo shadow-md scale-105' 
                      : 'bg-white text-stone-400 border-stone-200'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">{day.dayOfWeek}</span>
                  <span className="text-xl font-serif font-bold">{day.date.split('-')[2]}</span>
                </button>
              );
            })}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="max-w-md mx-auto">
        {activeTab === 'itinerary' ? (
          <div className="px-4 pt-6 space-y-6 animate-in fade-in duration-500">
            
            {/* Day Header Info */}
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-serif font-bold text-jp-black">{currentDay.locationName}</h1>
                <p className="text-stone-500 text-sm mt-1 flex items-center gap-1">
                   <Calendar size={12} /> {currentDay.date}
                </p>
              </div>
              {currentDay.weatherForecast && (
                <WeatherWidget 
                    condition={currentDay.weatherForecast.condition} 
                    temp={currentDay.weatherForecast.temp} 
                />
              )}
            </div>

            {/* Timeline */}
            <div className="ml-2 pt-2 pb-24">
              {currentDay.activities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity}
                  isEnriched={!!enrichedActivities[activity.id]}
                  enrichmentData={enrichedActivities[activity.id]}
                  onEnrich={handleEnrichment}
                />
              ))}
              
              {/* Hotel End of Day Block */}
              {currentDay.hotel && (
                <div className="relative pl-4 mt-6">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-stone-300 border-2 border-white"></div>
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-between text-stone-500">
                        <span className="text-xs font-bold uppercase tracking-wider">住宿</span>
                        <span className="text-sm font-bold text-stone-700 text-right">{currentDay.hotel}</span>
                    </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ToolsView />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-around items-center text-xs font-bold">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'itinerary' ? 'text-jp-indigo' : 'text-stone-300'}`}
        >
          <Map size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
          <span>行程</span>
        </button>
        <button 
          className="bg-jp-black text-white rounded-full p-3 -mt-8 shadow-lg border-4 border-jp-paper"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <LayoutGrid size={24} />
        </button>
        <button 
           onClick={() => setActiveTab('tools')}
           className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'tools' ? 'text-jp-indigo' : 'text-stone-300'}`}
        >
          <Calendar size={24} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />
          <span>工具</span>
        </button>
      </nav>
      
      <div className="h-[20px] w-full bg-white fixed bottom-0 z-[60]"></div> {/* Safe area filler */}
    </div>
  );
}