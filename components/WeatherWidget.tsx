import React from 'react';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

interface Props {
  condition: 'sunny' | 'cloudy' | 'rain' | 'snow';
  temp: number;
}

const WeatherWidget: React.FC<Props> = ({ condition, temp }) => {
  const getIcon = () => {
    switch (condition) {
      case 'sunny': return <Sun size={20} className="text-orange-400" />;
      case 'cloudy': return <Cloud size={20} className="text-gray-400" />;
      case 'rain': return <CloudRain size={20} className="text-blue-400" />;
      case 'snow': return <Snowflake size={20} className="text-sky-300" />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-2">
      {getIcon()}
      <span className="text-sm font-bold text-stone-700">{temp}°C</span>
    </div>
  );
};

export default WeatherWidget;
