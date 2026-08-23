import type { Quote } from "yahoo-finance2/modules/quote";
import { cache } from "../../utils/cache.js";
import { getStockDetailsFromYahooFinance } from "../../utils/yahoo-finance.js";

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

  const holdings = [
    {
      particulars: "HDFC Bank",
      purchasePrice: 1490,
      qty: 50,
      investment: 74500,
      portfolioPercentage: 0.048281,
      currentMarketPrice: 1700.15,
      currentValue: 85007.5,
      gainLoss: 10507.5,
      gainLossPercentage: 0.14104,
      marketCap: 1300795.862024,
      peRatio: 18.69,
      latestEarnings: 91.02,
      sector: "Financial Sector",
      symbol: "HDFCBANK",
    },
  ];

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
