import { ActivityType, DaySchedule } from './types';

export const INITIAL_ITINERARY: DaySchedule[] = [
  {
    date: '2025-12-24',
    dayOfWeek: '週三',
    locationName: '東京',
    weatherForecast: { temp: 8, condition: 'sunny' },
    hotel: 'VIA INN 秋葉原 JR 西日本集團',
    activities: [
      {
        id: 'd1-1',
        time: '09:20',
        title: 'HK Express UO848 辦理登機',
        type: ActivityType.FLIGHT,
        location: '香港國際機場 (HKG)',
        description: '出發前往成田'
      },
      {
        id: 'd1-2',
        time: '14:25',
        title: '抵達 成田機場 (NRT)',
        type: ActivityType.FLIGHT,
        location: '成田機場',
        description: '降落東京'
      },
      {
        id: 'd1-3',
        time: '15:48',
        title: 'N\'EX (成田特快)',
        type: ActivityType.TRANSPORT,
        location: '成田機場站',
        description: '前往東京/品川地區'
      },
      {
        id: 'd1-4',
        time: '18:00',
        title: '飯店 Check-in',
        type: ActivityType.HOTEL,
        location: 'VIA INN 秋葉原',
        description: '放置行李'
      },
      {
        id: 'd1-5',
        time: '19:30',
        title: '東京聖誕市集',
        type: ActivityType.SIGHTSEEING,
        location: '明治神宮外苑',
        description: '感受聖誕節日氣氛'
      }
    ]
  },
  {
    date: '2025-12-25',
    dayOfWeek: '週四',
    locationName: '東京',
    weatherForecast: { temp: 9, condition: 'cloudy' },
    hotel: 'VIA INN 秋葉原 JR 西日本集團',
    activities: [
      {
        id: 'd2-1',
        time: '09:00',
        title: '早餐',
        type: ActivityType.FOOD,
        location: '秋葉原周邊'
      },
      {
        id: 'd2-2',
        time: '10:00',
        title: '表參道購物',
        type: ActivityType.SHOPPING,
        location: '表參道',
        description: '參觀 POLÈNE 東京店'
      },
      {
        id: 'd2-3',
        time: '13:00',
        title: '惠比壽啤酒紀念館',
        type: ActivityType.SIGHTSEEING,
        location: '惠比壽花園廣場',
        description: '參觀與試飲 (需預約)'
      },
      {
        id: 'd2-gap',
        time: '15:00',
        title: '自由時間 (AI 推薦)',
        type: ActivityType.SIGHTSEEING,
        isGap: true,
        location: '澀谷'
      },
      {
        id: 'd2-4',
        time: '18:00',
        title: '豐洲 Urban Dock Lalaport',
        type: ActivityType.SHOPPING,
        location: '豐洲',
        description: '晚餐與欣賞夜景'
      }
    ]
  },
  {
    date: '2025-12-26',
    dayOfWeek: '週五',
    locationName: '輕井澤',
    weatherForecast: { temp: 2, condition: 'snow' },
    hotel: '輕井澤渴望之家飯店 (Longing House)',
    activities: [
      {
        id: 'd3-1',
        time: '09:00',
        title: '早餐',
        type: ActivityType.FOOD,
        location: '飯店/周邊'
      },
      {
        id: 'd3-2',
        time: '11:00',
        title: '取租賃車',
        type: ActivityType.TRANSPORT,
        location: '日本租車 神田店',
        description: '先辦理飯店退房'
      },
      {
        id: 'd3-3',
        time: '12:00',
        title: '駕車前往輕井澤',
        type: ActivityType.TRANSPORT,
        location: '關越自動車道',
        description: '車程約 2小時 20分'
      },
      {
        id: 'd3-4',
        time: '15:00',
        title: '雲場池',
        type: ActivityType.SIGHTSEEING,
        location: '雲場池',
        description: '風景漫步'
      },
      {
        id: 'd3-5',
        time: '16:00',
        title: '輕井澤王子購物廣場',
        type: ActivityType.SHOPPING,
        location: '輕井澤王子購物廣場',
        description: 'Outlet 購物至 20:00'
      }
    ]
  },
  {
    date: '2025-12-27',
    dayOfWeek: '週六',
    locationName: '輕井澤',
    weatherForecast: { temp: -1, condition: 'snow' },
    hotel: '輕井澤渴望之家飯店 (Longing House)',
    activities: [
      {
        id: 'd4-1',
        time: '09:00',
        title: '早餐',
        type: ActivityType.FOOD,
        location: '飯店'
      },
      {
        id: 'd4-2',
        time: '10:30',
        title: '榆樹街小鎮 (Harunire Terrace)',
        type: ActivityType.SIGHTSEEING,
        location: '榆樹街小鎮',
        description: '森林中的商店與咖啡廳'
      },
      {
        id: 'd4-3',
        time: '13:00',
        title: '輕井澤高原教會',
        type: ActivityType.SIGHTSEEING,
        location: '輕井澤高原教會'
      },
      {
        id: 'd4-4',
        time: '14:30',
        title: 'Kera-Ike 溜冰場',
        type: ActivityType.SIGHTSEEING,
        location: 'Kera-Ike Ice Rink',
        description: '森林冰場溜冰'
      }
    ]
  },
  {
    date: '2025-12-28',
    dayOfWeek: '週日',
    locationName: '草津/四萬',
    weatherForecast: { temp: 0, condition: 'cloudy' },
    hotel: '四萬溫泉 柏屋旅館',
    activities: [
      {
        id: 'd5-1',
        time: '09:00',
        title: '早餐',
        type: ActivityType.FOOD,
        location: '飯店'
      },
      {
        id: 'd5-2',
        time: '11:00',
        title: '退房 & 駕車往草津',
        type: ActivityType.TRANSPORT,
        location: '國道 146 號',
        description: '車程約 1 小時'
      },
      {
        id: 'd5-3',
        time: '12:30',
        title: '草津溫泉 湯畑',
        type: ActivityType.SIGHTSEEING,
        location: '草津溫泉湯畑',
        description: '西之河原通 & 湯揉秀'
      },
      {
        id: 'd5-4',
        time: '15:00',
        title: '駕車往四萬溫泉',
        type: ActivityType.TRANSPORT,
        location: '四萬溫泉',
        description: '車程約 1 小時'
      },
      {
        id: 'd5-5',
        time: '16:00',
        title: '旅館 Check-in',
        type: ActivityType.HOTEL,
        location: '四萬溫泉 柏屋旅館',
        description: '享受溫泉與懷石料理 (一泊二食)'
      }
    ]
  },
  {
    date: '2025-12-29',
    dayOfWeek: '週一',
    locationName: '千葉/返程',
    weatherForecast: { temp: 10, condition: 'sunny' },
    hotel: '溫暖的家',
    activities: [
      {
        id: 'd6-1',
        time: '08:30',
        title: '早餐',
        type: ActivityType.FOOD,
        location: '旅館'
      },
      {
        id: 'd6-2',
        time: '10:00',
        title: '退房 & 駕車往 Outlet',
        type: ActivityType.TRANSPORT,
        location: '酒酒井 Premium Outlets',
        description: '長途車程約 3小時 30分'
      },
      {
        id: 'd6-3',
        time: '14:00',
        title: '酒酒井 Premium Outlets',
        type: ActivityType.SHOPPING,
        location: '酒酒井 Premium Outlets',
        description: '最後衝刺購物'
      },
      {
        id: 'd6-4',
        time: '19:00',
        title: '還車',
        type: ActivityType.TRANSPORT,
        location: '日本租車 成田機場店',
        description: '登機前歸還車輛'
      },
      {
        id: 'd6-5',
        time: '20:55',
        title: 'UO693 返港航班',
        type: ActivityType.FLIGHT,
        location: '成田機場 第2航廈'
      }
    ]
  }
];

export const FLIGHT_INFO = {
  outbound: {
    code: 'UO848',
    airline: 'HK Express',
    dep: '09:20 HKG (香港)',
    arr: '14:25 NRT (成田)',
    duration: '4小時 5分'
  },
  inbound: {
    code: 'UO693',
    airline: 'HK Express',
    dep: '20:55 NRT (成田)',
    arr: '01:25 HKG (香港) (+1)',
    duration: '5小時 30分'
  }
};

export const EMERGENCY_NUMBERS = [
  { name: '警察', number: '110' },
  { name: '救護車/火警', number: '119' },
  { name: '日本旅遊熱線 (Visitor Hotline)', number: '050-3816-2787' }
];