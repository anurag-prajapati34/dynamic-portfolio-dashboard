import { formatCurrency } from "@/utils/string-helper";
import { PortfolioSummary } from "@/utils/types";
import React from "react";


export interface SummaryCardProps {
    summary: PortfolioSummary
}
export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
    const isPositive = summary.totalChange >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

            <div className="p-5 bg-white  border ">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Portfolio Value
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {formatCurrency(summary.totalValue)}
                </h3>
            </div>


            <div className="p-5 bg-white  border ">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Investment
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {formatCurrency(summary.totalInvestment)}
                </h3>
            </div>


            <div className="p-5 bg-white  border ">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Gain / Loss
                </p>
                <div className="flex items-baseline justify-between mt-2">
                    <h3 className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                        {isPositive ? "+" : ""}{formatCurrency(summary.totalChange)}
                    </h3>
                    <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {isPositive ? "+" : ""}{summary.totalChangePercent.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    );
};