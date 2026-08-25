import { fetchAndCacheGoogleFinanceMetrics } from "../../utils/google-finance.js";
import type {
  GoogleFinanceMetrics,
  YahooFinanceMetrics,
} from "../../utils/types.js";
import { fetchAndCacheYahooFinanceMetrics } from "../../utils/yahoo-finance.js";
import { getPortflioHoldingsQuery } from "./queries.js";

export const getHoldingsService = async () => {
  const holdings = getPortflioHoldingsQuery();
  const symbols = holdings.map((holding) => holding.symbol);

  const yahooFinanceMetrics = await fetchAndCacheYahooFinanceMetrics(symbols);
  const googleFinanceMetrics = await fetchAndCacheGoogleFinanceMetrics(symbols);

  const yahooFinanceMetricsLookup = new Map<string, YahooFinanceMetrics>();
  for (const metrics of yahooFinanceMetrics) {
    if (metrics.symbol) {
      yahooFinanceMetricsLookup.set(metrics.symbol, metrics);
    }
  }

  const googleFinanceMetricsLookup = new Map<string, GoogleFinanceMetrics>();
  for (const metrics of googleFinanceMetrics) {
    if (metrics.symbol) {
      googleFinanceMetricsLookup.set(metrics.symbol, metrics);
    }
  }

  const enhancedHoldings = holdings.map((holding) => {
    const symbol = String(holding.symbol).trim();

    const yahooMetrics = symbol
      ? yahooFinanceMetricsLookup.get(symbol + ".NS")
      : null;
    const googleMetrics = symbol
      ? googleFinanceMetricsLookup.get(symbol)
      : null;

    const currentMarketPrice = yahooMetrics?.regularMarketPrice ?? 0;
    const currentValue = currentMarketPrice * holding.qty;
    const gainLoss = currentValue - holding.investment;
    const gainLossPercentage = (gainLoss / holding.investment) * 100;

    const googleLatestEarnings = googleMetrics?.latestEarnings ?? null;

    const peRatio = googleLatestEarnings
      ? currentMarketPrice / googleLatestEarnings
      : null;

    return {
      ...holding,
      currentMarketPrice: currentMarketPrice,
      currentValue: currentValue,
      gainLoss: gainLoss,
      gainLossPercentage: gainLossPercentage,
      peRatio: peRatio ?? yahooMetrics?.trailingPE ?? null,
      latestEarnings: yahooMetrics?.epsTrailingTwelveMonths ?? null,
      symbol: symbol,
    };
  });

  return enhancedHoldings;
};
