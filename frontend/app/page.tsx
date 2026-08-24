'use client';

import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SectorBarChart } from "@/components/SectorBarChart";
import { SectorGroup } from "@/components/SectorGroup";
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
    <div className="w-full flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-4 px-16 bg-white sm:items-start gap-4">
        <Header lastUpdated={new Date().toLocaleString()} isFetching={false} onRefresh={() => { }} />
        <SummaryCard summary={
          summary

        } />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4
         ">
          < SectorPieChart data={SectorChartData} />
          <SectorBarChart data={SectorChartData} />
        </div>
        <SearchBar searchQuery="" setSearchQuery={() => { }} />
        {Object.keys(sectorWiseHoldings).map((sectorName) => (
          <SectorGroup key={sectorName} sectorName={sectorName} holdings={sectorWiseHoldings[sectorName]} />))}
      </main>
    </div>
  );
}
