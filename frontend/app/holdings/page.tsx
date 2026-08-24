'use client'
import { SearchBar } from "@/components/SearchBar";
import { SectorGroup } from "@/components/SectorGroup";
import { aggregateHoldingsSectorWise } from "@/utils/portfolio-helper";

export default function Holdings() {

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
    return <div className="w-full flex flex-col gap-4 px-4 py-4 ">

        <SearchBar searchQuery="" setSearchQuery={() => { }} />
        {Object.keys(sectorWiseHoldings).map((sectorName) => (
            <SectorGroup key={sectorName} sectorName={sectorName} holdings={sectorWiseHoldings[sectorName]} />))}

    </div>
}