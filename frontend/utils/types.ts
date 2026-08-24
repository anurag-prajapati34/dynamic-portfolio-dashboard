export interface PortfolioSummary {
  totalInvestment: number;
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
}

export interface Holding {
  particulars: string;
  purchasePrice: number;
  qty: number;
  investment: number;
  portfolioPercentage: number;
  currentMarketPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  marketCap: number;
  peRatio: number;
  latestEarnings: number;
  sector: string;
  symbol: string;
}
