import axios from "axios";
import * as Cheerio from "cheerio";
import { googleCache } from "./cache.js";
import type { GoogleFinanceMetrics } from "./types.js";

export async function fetchGoogleFinanceMetrics(symbol: string) {
  try {
    const ticker = symbol.split(":")[0]?.toUpperCase()?.trim() + ":NSE";

    if (!ticker) return { symbol, peRatio: null, latestEarnings: null };

    const url = `https://www.google.com/finance/beta/quote/${ticker}`;

    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 5000,
    });

    const $ = Cheerio.load(html);
    let peRatio: number | null = null;
    let latestEarnings: number | null = null;

    $(".KxsRFb").each((_, element) => {
      const label = $(element).find(".SwQK7").text().trim().toLowerCase();
      const valueText = $(element)
        .find(".dO6ijd")
        .text()
        .trim()
        .replace(/,/g, "");

      if (label.includes("p/e ratio")) {
        const parsed = parseFloat(valueText);
        peRatio = isNaN(parsed) ? null : parsed;
      }

      if (label.includes("eps") || label.includes("earnings per share")) {
        const parsed = parseFloat(valueText.replace("₹", ""));
        latestEarnings = isNaN(parsed) ? null : parsed;
      }
    });

    return { symbol, peRatio, latestEarnings };
  } catch (error) {
    console.error(`Failed to scrape Google Finance for ${symbol}:`, error);
    return null;
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function fetchGoogleFinanceMetricsBatch(symbols: string[]) {
  const result: GoogleFinanceMetrics[] = [];

  for (let i = 0; i < symbols.length; i += 3) {
    const batch = symbols.slice(i, i + 3);

    const batchResults = await Promise.all(
      batch.map(async (symbol) => {
        return await fetchGoogleFinanceMetrics(symbol);
      }),
    );

    const filteredBatchResults = batchResults.filter(
      (result) => result !== null,
    );
    result.push(...filteredBatchResults);

    if (i + 3 < symbols.length) {
      const ms = 1000;
      await delay(ms);
    }
  }

  return result;
}

export async function fetchAndCacheGoogleFinanceMetrics(
  symbols: string[],
): Promise<GoogleFinanceMetrics[]> {
  try {
    const cacheKey = "google-finance-metrics";
    const cachedMetrics = googleCache.get(cacheKey);

    if (
      cachedMetrics &&
      Array.isArray(cachedMetrics) &&
      cachedMetrics.length > 0
    ) {
      return cachedMetrics;
    }

    const metrics = await fetchGoogleFinanceMetricsBatch(symbols);

    if (!metrics || !metrics.length) {
      return [];
    }

    googleCache.set(cacheKey, metrics);
    return metrics;
  } catch (error) {
    console.error("Error fetching Google Finance metrics:", error);
    return [];
  }
}
