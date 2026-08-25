import { error } from "node:console";
import yahooFinance from "yahoo-finance2";
import { yahooCache } from "./cache.js";
import type { YahooFinanceMetrics } from "./types.js";

export const fetchYahooFinanceMetrics = async (symbols: string[]) => {
  try {
    const tickers: string[] = [];
    for (let symbol of symbols) {
      symbol = String(symbol).trim();
      if (symbol) tickers.push(symbol + ".NS");
    }

    const yf = new yahooFinance();
    return await yf.quote(tickers);
  } catch (e) {
    console.log(e);
    throw error;
  }
};

export async function fetchAndCacheYahooFinanceMetrics(
  symbols: string[],
): Promise<YahooFinanceMetrics[]> {
  const cacheKey = "google-yahoo-metrics";
  const cachedMetrics = yahooCache.get(cacheKey);
  if (
    cachedMetrics &&
    Array.isArray(cachedMetrics) &&
    cachedMetrics.length > 0
  ) {
    console.log("yahooFinanceMetrics from cache");
    return cachedMetrics;
  }
  console.log("yahooFinanceMetrics from api");
  const metrics = await fetchYahooFinanceMetrics(symbols);
  yahooCache.set(cacheKey, metrics);
  return metrics as YahooFinanceMetrics[];
}
