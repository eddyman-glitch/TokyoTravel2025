import { GoogleGenAI, Type } from "@google/genai";
import { AIEnrichment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEnrichmentForActivity = async (
  activityTitle: string,
  location: string,
  activityId: string
): Promise<AIEnrichment> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    我是一名在日本旅遊的遊客。我正在造訪 ${location || '日本'} ，行程活動是 "${activityTitle}"。
    
    請扮演專業的在地導遊，提供一個 JSON 物件，包含以下資訊（請使用繁體中文）：
    1. history: 一個簡短的歷史冷知識或景點有趣事實（約 30-50 字）。
    2. tips: 一個實用的旅遊貼士，例如最佳拍照角度、避開人潮時間、或注意事項。
    3. mustEat: 陣列，推薦 1-2 個該地點附近的具體特色美食或餐廳類型（請簡潔）。
    4. mustBuy: 陣列，推薦 1-2 個該地點的特色伴手禮或紀念品（若不適用則留空）。
    
    如果行程是通用的（如「早餐」、「移動中」、「飯店」），請給出適合該情境的日本旅遊建議。
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            history: { type: Type.STRING },
            tips: { type: Type.STRING },
            mustEat: { type: Type.ARRAY, items: { type: Type.STRING } },
            mustBuy: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");

    return {
      activityId,
      ...data
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return fallback data to avoid crashing the UI
    return {
      activityId,
      tips: "旅途愉快！日本鄉下地方建議隨身攜帶現金。",
      history: "這裡是日本熱門的旅遊區域。",
      mustEat: ["當地季節限定料理"],
      mustBuy: []
    };
  }
};

export const suggestGapActivity = async (
  location: string,
  time: string
): Promise<string> => {
   const modelId = "gemini-2.5-flash";
   const prompt = `我在 ${location} 的 ${time} 有空閒時間。請建議一個具體的、有趣的活動或隱藏景點來填補 2 小時的空檔。請只回傳「景點名稱：一句話描述」（請使用繁體中文，總字數 30 字以內）。`;
   
   try {
     const response = await ai.models.generateContent({
       model: modelId,
       contents: prompt,
     });
     return response.text || "在附近街道散步探索，感受當地氛圍。";
   } catch (e) {
     return "參觀當地的便利商店或超市，尋找限定商品。";
   }
}