import yahooFinance from "yahoo-finance2";
import { yahooCache } from "./cache.js";
import type { YahooFinanceMetrics } from "./types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchYahooFinanceMetricsBatch = async (symbols: string[]) => {
  const tickers: string[] = [];
  for (let symbol of symbols) {
    symbol = String(symbol).trim();
    if (symbol) tickers.push(symbol + ".NS");
  }

  const yf = new yahooFinance();

  const result = [];

  for (let i = 0; i < tickers.length; i += 5) {
    const batch = tickers.slice(i, i + 5);
    const batchResult = await yf.quote(batch);
    result.push(...batchResult);

    const ms = 1000;
    await delay(ms);
  }

  return result;
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
    return cachedMetrics;
  }
  const metrics = await fetchYahooFinanceMetricsBatch(symbols);
  yahooCache.set(cacheKey, metrics);
  return metrics as YahooFinanceMetrics[];
}
