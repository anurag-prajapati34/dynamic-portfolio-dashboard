import { Holding, PortfolioSummary } from "./types";

export const extractSummaryFromHoldings = (
  holdings: Holding[],
): PortfolioSummary => {
  const totalInvestment = holdings.reduce((sum, h) => sum + h.investment, 0);
  const totalPresentValue = holdings.reduce(
    (sum, h) => sum + (h.currentValue || 0),
    0,
  );
  const totalGainLoss = totalPresentValue - totalInvestment;
  return {
    totalInvestment,
    totalValue: totalPresentValue,
    totalChange: totalGainLoss,
    totalChangePercent: (totalGainLoss / totalInvestment) * 100,
  };
};

export const aggregateHoldingsSectorWise = (holdings: Holding[]) => {
  const holdingsBySector = holdings.reduce(
    (acc, h) => {
      const sector = h.sector;
      if (!acc[sector]) {
        acc[sector] = [];
      }
      acc[sector].push(h);
      return acc;
    },
    {} as Record<string, Holding[]>,
  );
  return holdingsBySector;
};
