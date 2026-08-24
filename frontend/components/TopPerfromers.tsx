'use client'
import { Holding } from "@/utils/types";
import { PortfolioTable } from "./PortfolioTable";

export function TopPerformers(
    { holdings }: { holdings: Holding[] }
) {

    const sortedHoldings = holdings.sort((a, b) => b.gainLossPercentage - a.gainLossPercentage);
    holdings = sortedHoldings.slice(0, 5);

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Top Performers</h2>
            <PortfolioTable data={holdings} />
        </div>
    )
}