"use client";

import { extractSummaryFromHoldings } from "@/utils/portfolio-helper";
import { formatCurrency } from "@/utils/string-helper";
import { Holding } from "@/utils/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { PortfolioTable } from "./PortfolioTable";
interface SectorGroupProps {
    sectorName: string;
    holdings: Holding[];
}

export const SectorGroup: React.FC<SectorGroupProps> = ({
    sectorName,
    holdings,
}) => {
    const [isOpen, setIsOpen] = useState(true);




    const {
        totalInvestment,
        totalChange,
        totalValue
    } = extractSummaryFromHoldings(holdings);



    return (
        <div className="bg-white  border shadow-sm  overflow-hidden w-full">

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-gray-50 flex flex-wrap items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors border-b select-none"
            >

                <div className="flex items-center space-x-3">
                    {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <h2 className="text-lg font-bold text-gray-800">{sectorName}</h2>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full font-medium">
                        {holdings.length} {holdings.length === 1 ? "stock" : "stocks"}
                    </span>
                </div>


                <div className="flex items-center space-x-6 text-sm mt-2 sm:mt-0">
                    <div>
                        <span className="text-xs text-gray-500 uppercase block">
                            Total Investment
                        </span>
                        <span className="font-semibold text-gray-900">
                            {formatCurrency(totalInvestment)}
                        </span>
                    </div>

                    <div>
                        <span className="text-xs text-gray-500 uppercase block">
                            Present Value
                        </span>
                        <span className="font-semibold text-gray-900">
                            {formatCurrency(totalValue)}
                        </span>
                    </div>

                    <div>
                        <span className="text-xs text-gray-500 uppercase block">
                            Gain / Loss
                        </span>
                        <span
                            className={`font-bold ${totalChange >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {totalChange >= 0 ? "+" : ""}{formatCurrency(totalChange)}
                        </span>
                    </div>
                </div>
            </div>


            {isOpen && <PortfolioTable data={holdings} />}
        </div>
    );
};