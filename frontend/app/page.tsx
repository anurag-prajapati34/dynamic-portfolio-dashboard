'use client';

import { Header } from "@/components/Header";
import { PortfolioTable } from "@/components/PortfolioTable";
import { SectorBarChart } from "@/components/SectorBarChart";
import { SectorPieChart } from "@/components/SectorPieChart";
import { SummaryCard } from "@/components/SummaryCard";
import { aggregateHoldingsSectorWise, extractSummaryFromHoldings } from "@/utils/portfolio-helper";

export default function Home() {

  const holdings = [
    {
      particulars: "Reliance Industries Ltd",
      purchasePrice: 2450.50,
      qty: 100,
      investment: 245050,
      portfolioPercentage: 18.7,
      currentMarketPrice: 2625.75,
      currentValue: 262575,
      gainLoss: 17525,
      gainLossPercentage: 7.15,
      marketCap: 1780000000000,
      peRatio: 23.4,
      latestEarnings: 76500,
      sector: "Energy & Petrochemicals",
      symbol: "RELIANCE"
    },
    {
      particulars: "Tata Motors Ltd",
      purchasePrice: 2450.50,
      qty: 100,
      investment: 245050,
      portfolioPercentage: 18.7,
      currentMarketPrice: 2625.75,
      currentValue: 262575,
      gainLoss: 17525,
      gainLossPercentage: 7.15,
      marketCap: 1780000000000,
      peRatio: 23.4,
      latestEarnings: 76500,
      sector: "Energy & Petrochemicals",
      symbol: "TATAMOTORS"
    },

    {
      particulars: "Reliance Industries Ltd",
      purchasePrice: 2450.50,
      qty: 100,
      investment: 245050,
      portfolioPercentage: 18.7,
      currentMarketPrice: 2625.75,
      currentValue: 262575,
      gainLoss: 17525,
      gainLossPercentage: 7.15,
      marketCap: 1780000000000,
      peRatio: 23.4,
      latestEarnings: 76500,
      sector: "Petroleum",
      symbol: "RELIANCE"
    },
  ];
  const sectorWiseHoldings = aggregateHoldingsSectorWise(holdings);
  const summary = extractSummaryFromHoldings(holdings);

  const SectorChartData = Object.keys(sectorWiseHoldings).map((sectorName) => ({
    sector: sectorName,
    totalInvestment: sectorWiseHoldings[sectorName].reduce((total, holding) => total + holding.investment, 0),
    totalPresentValue: sectorWiseHoldings[sectorName].reduce((total, holding) => total + (holding.currentValue || 0), 0),
  }))
  return (
    <div className="w-full flex flex-col gap-4 px-4 py-4 ">

      <Header lastUpdated={new Date().toLocaleString()} isFetching={false} onRefresh={() => { }} />
      <SummaryCard summary={
        summary

      } />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4
         ">
        < SectorPieChart data={SectorChartData} />
        <SectorBarChart data={SectorChartData} />
      </div>
      <PortfolioTable data={holdings} />

    </div>
  );
}
