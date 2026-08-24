'use client';

import { Header } from "@/components/Header";
import { SectorBarChart } from "@/components/SectorBarChart";
import { SectorPieChart } from "@/components/SectorPieChart";
import { SummaryCard } from "@/components/SummaryCard";
import { TopPerformers } from "@/components/TopPerfromers";
import { fetchPortfolioData } from "@/services/api";
import { aggregateHoldingsSectorWise, extractSummaryFromHoldings } from "@/utils/portfolio-helper";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['holdings'],
    queryFn: () => fetchPortfolioData(),
    refetchInterval: 15000,
    staleTime: 15000
  })

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Fetching portfolio holdings...</span>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error || !data) {
    return (
      <div className="p-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          Failed to load portfolio data. Please try again
        </div>
      </div>
    );
  }
  console.log("fetched holdings data----", data)

  const holdings = data?.data;
  const sectorWiseHoldings = aggregateHoldingsSectorWise(holdings);
  const summary = extractSummaryFromHoldings(holdings);

  const SectorChartData = Object.keys(sectorWiseHoldings).map((sectorName) => ({
    sector: sectorName,
    totalInvestment: sectorWiseHoldings[sectorName].reduce((total, holding) => total + holding.investment, 0),
    totalPresentValue: sectorWiseHoldings[sectorName].reduce((total, holding) => total + (holding.currentValue || 0), 0),
  }))
  return (
    <div className="w-full flex flex-col gap-4 px-4 py-4 ">

      {/* <Header lastUpdated={new Date().toLocaleString()} isFetching={false} onRefresh={() => { }} /> */}
      <SummaryCard summary={
        summary

      } />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4
         ">
        < SectorPieChart data={SectorChartData} />
        <SectorBarChart data={SectorChartData} />
      </div>

      <TopPerformers holdings={holdings} />

    </div>
  );
}
