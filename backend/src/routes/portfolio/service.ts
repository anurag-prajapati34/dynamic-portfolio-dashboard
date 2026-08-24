import type { Quote } from "yahoo-finance2/modules/quote";
import { cache } from "../../utils/cache.js";
import { getStockDetailsFromYahooFinance } from "../../utils/yahoo-finance.js";
import { getPortflioHoldingsQuery } from "./queries.js";

const HOLDINGS_CACHE_KEY = "holdings";
export const getHoldingsService = async () => {
  const cachedHoldings = cache.get(HOLDINGS_CACHE_KEY);

  if (
    cachedHoldings &&
    Array.isArray(cachedHoldings) &&
    cachedHoldings.length > 0
  ) {
    return cachedHoldings;
  }

  const holdings = getPortflioHoldingsQuery();

  const symbols: string[] = [];
  for (const holding of holdings) {
    const symbol = String(holding.symbol).trim();
    if (symbol) symbols.push(symbol + ".NS");
  }

  const result = await getStockDetailsFromYahooFinance(symbols);
  const yahooMarketDataMap = new Map<string, Quote>();
  for (const quote of result) {
    if (quote.symbol) {
      yahooMarketDataMap.set(quote.symbol, quote);
    }
  }

  const enhancedHoldings = holdings.map((holding) => {
    const symbol = String(holding.symbol).trim();

    const quote = symbol ? yahooMarketDataMap.get(symbol + ".NS") : null;

    const liveCMP = quote?.regularMarketPrice ?? 0;
    const presentValue = liveCMP * holding.qty;
    const gainLoss = presentValue - holding.investment;
    const gainLossPercentage = (gainLoss / holding.investment) * 100;

    return {
      ...holding,
      currentMarketPrice: liveCMP,
      currentValue: presentValue,
      gainLoss: gainLoss,
      gainLossPercentage: gainLossPercentage,
      peRatio: quote?.trailingPE ?? null,
      latestEarnings: quote?.epsTrailingTwelveMonths ?? null,
      symbol: symbol,
    };
  });

  cache.set(HOLDINGS_CACHE_KEY, enhancedHoldings);
  return enhancedHoldings;
};
