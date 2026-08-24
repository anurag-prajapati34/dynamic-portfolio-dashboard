'use client'
import { SearchBar } from "@/components/SearchBar";
import { SectorGroup } from "@/components/SectorGroup";
import { fetchPortfolioData } from "@/services/api";
import { aggregateHoldingsSectorWise } from "@/utils/portfolio-helper";
import { useQuery } from "@tanstack/react-query";

export default function Holdings() {

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
                    Failed to load portfolio data. Make sure your Express backend is running on port 5000.
                </div>
            </div>
        );
    }
    console.log("fetched holdings data----", data)

    const holdings = data?.data || []
    const sectorWiseHoldings = aggregateHoldingsSectorWise(holdings);
    return <div className="w-full flex flex-col gap-4 px-4 py-4 ">

        <SearchBar searchQuery="" setSearchQuery={() => { }} />
        {Object.keys(sectorWiseHoldings).map((sectorName) => (
            <SectorGroup key={sectorName} sectorName={sectorName} holdings={sectorWiseHoldings[sectorName]} />))}

    </div>
}