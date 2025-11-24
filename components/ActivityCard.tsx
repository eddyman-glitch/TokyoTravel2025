import React, { useState } from 'react';
import { Activity, ActivityType, AIEnrichment } from '../types';
import { MapPin, Utensils, Train, Camera, ShoppingBag, Info, Sparkles, Navigation, ChevronDown, ChevronUp, BookOpen, Lightbulb, ShoppingCart } from 'lucide-react';
import { getEnrichmentForActivity, suggestGapActivity } from '../services/geminiService';

interface Props {
  activity: Activity;
  isEnriched: boolean;
  enrichmentData?: AIEnrichment;
  onEnrich: (data: AIEnrichment) => void;
}

const ActivityCard: React.FC<Props> = ({ activity, isEnriched, enrichmentData, onEnrich }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (activity.type) {
      case ActivityType.FOOD: return <Utensils size={18} />;
      case ActivityType.TRANSPORT: return <Train size={18} />;
      case ActivityType.SIGHTSEEING: return <Camera size={18} />;
      case ActivityType.SHOPPING: return <ShoppingBag size={18} />;
      case ActivityType.FLIGHT: return <div className="font-bold text-xs">FLY</div>;
      default: return <Info size={18} />;
    }
  };

  const getTypeColor = () => {
    switch (activity.type) {
      case ActivityType.FOOD: return 'bg-orange-100 text-orange-700 border-orange-200';
      case ActivityType.TRANSPORT: return 'bg-blue-50 text-blue-700 border-blue-100';
      case ActivityType.SIGHTSEEING: return 'bg-green-50 text-jp-matcha border-green-100';
      case ActivityType.SHOPPING: return 'bg-purple-50 text-purple-700 border-purple-100';
      case ActivityType.HOTEL: return 'bg-stone-100 text-stone-600 border-stone-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const toggleEnrichment = async () => {
    // Toggle Logic
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    // If closing, do nothing else
    if (!nextState) return;

    // GAP Activity Logic
    if (activity.isGap && !suggestion) {
        setLoading(true);
        try {
            const sugg = await suggestGapActivity(activity.location || 'Tokyo', activity.time);
            setSuggestion(sugg);
        } finally {
            setLoading(false);
        }
        return;
    }

    // Normal Activity Logic: Fetch if not enriched
    if (!activity.isGap && !isEnriched) {
      setLoading(true);
      try {
        const data = await getEnrichmentForActivity(activity.title, activity.location || '', activity.id);
        onEnrich(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const openMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.location) {
      const query = encodeURIComponent(activity.location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  return (
    <div className="relative pl-4 pb-8 border-l-2 border-stone-200 last:border-0 last:pb-0">
      {/* Timeline Dot */}
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${activity.type === ActivityType.TRANSPORT ? 'bg-jp-indigo' : 'bg-jp-red'}`}></div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm font-bold text-stone-400 font-sans tracking-wide">{activity.time}</span>
            <h3 className="font-serif font-bold text-lg text-jp-black mt-1 leading-tight">{activity.title}</h3>
            {activity.location && (
              <div className="flex items-center text-xs text-stone-500 mt-1 cursor-pointer hover:text-blue-600 group" onClick={openMaps}>
                <MapPin size={12} className="mr-1 group-hover:animate-bounce" />
                {activity.location}
              </div>
            )}
          </div>
          <div className={`p-2 rounded-full ${getTypeColor()}`}>
            {getIcon()}
          </div>
        </div>

        {/* Description */}
        {activity.description && (
          <p className="text-sm text-stone-600 font-sans">{activity.description}</p>
        )}

        {/* Actions Bar */}
        <div className="flex gap-2 mt-1">
            {activity.location && (
                 <button 
                 onClick={openMaps}
                 className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
                 <Navigation size={14} /> 導航
               </button>
            )}
          
          <button 
            onClick={toggleEnrichment}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all border 
              ${isExpanded 
                ? 'bg-jp-sakura text-jp-indigo border-jp-indigo/30 shadow-inner' 
                : 'text-jp-indigo border-jp-indigo/20 hover:bg-blue-50'}`}
          >
            {loading ? (
                <span className="flex items-center gap-2 animate-pulse"><Sparkles size={14} /> 思考中...</span>
            ) : (
                <>
                  <Sparkles size={14} /> 
                  {activity.isGap ? '推薦行程' : 'AI 導遊'}
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </>
            )}
          </button>
        </div>

        {/* Collapsible Content Area */}
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="pt-3">
              
              {/* Gap Suggestion Content */}
              {activity.isGap && suggestion && (
                <div className="bg-jp-sakura p-3 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-1">
                    <p className="text-sm text-jp-indigo font-bold flex items-center gap-2 mb-1">
                        <Sparkles size={14} /> 推薦活動:
                    </p>
                    <p className="text-stone-700 text-sm">{suggestion}</p>
                </div>
              )}

              {/* Normal Activity Enrichment Content */}
              {!activity.isGap && isEnriched && enrichmentData && (
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-4 animate-in fade-in slide-in-from-top-1">
                  
                  {/* History / Facts */}
                  {enrichmentData.history && (
                    <div className="flex gap-3 items-start">
                      <div className="bg-white p-1.5 rounded-full border border-stone-200 text-stone-400 shrink-0">
                        <BookOpen size={14} />
                      </div>
                      <div>
                        <span className="font-bold text-stone-700 block text-xs mb-1">關於這裡</span>
                        <p className="text-stone-600 leading-relaxed text-xs">{enrichmentData.history}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Tips */}
                  {enrichmentData.tips && (
                    <div className="flex gap-3 items-start">
                      <div className="bg-white p-1.5 rounded-full border border-yellow-200 text-yellow-500 shrink-0">
                        <Lightbulb size={14} />
                      </div>
                      <div>
                        <span className="font-bold text-stone-700 block text-xs mb-1">小撇步</span>
                        <p className="text-stone-600 leading-relaxed text-xs">{enrichmentData.tips}</p>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-dashed border-stone-200 my-2"></div>

                  {/* Recommendations Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Must Eat */}
                    <div className="space-y-2">
                       <div className="flex items-center gap-1.5 text-orange-600">
                          <Utensils size={14} />
                          <span className="text-xs font-bold">必吃美食</span>
                       </div>
                       {enrichmentData.mustEat && enrichmentData.mustEat.length > 0 ? (
                         <ul className="space-y-1">
                            {enrichmentData.mustEat.map((item, i) => (
                              <li key={i} className="text-xs text-stone-600 bg-white px-2 py-1 rounded border border-stone-100 shadow-sm truncate">
                                {item}
                              </li>
                            ))}
                         </ul>
                       ) : <span className="text-xs text-stone-400">無特別推薦</span>}
                    </div>

                    {/* Must Buy */}
                    <div className="space-y-2">
                       <div className="flex items-center gap-1.5 text-purple-600">
                          <ShoppingCart size={14} />
                          <span className="text-xs font-bold">必買伴手禮</span>
                       </div>
                       {enrichmentData.mustBuy && enrichmentData.mustBuy.length > 0 ? (
                         <ul className="space-y-1">
                            {enrichmentData.mustBuy.map((item, i) => (
                              <li key={i} className="text-xs text-stone-600 bg-white px-2 py-1 rounded border border-stone-100 shadow-sm truncate">
                                {item}
                              </li>
                            ))}
                         </ul>
                       ) : <span className="text-xs text-stone-400">無特別推薦</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivityCard;