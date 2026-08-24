import { formatCurrency } from "@/utils/string-helper";
import { PortfolioSummary } from "@/utils/types";
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React from "react";

export interface SummaryCardProps {
    summary: PortfolioSummary;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
    const isPositive = summary.totalChange >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

            <div className="p-5 bg-white border border-gray-400 rounded-lg flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500  tracking-wider">
                            Total Portfolio Value
                        </p>
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                            <Wallet size={16} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(summary.totalValue)}
                    </h3>
                </div>
                <p className="text-[11px] text-gray-500 mt-3">
                    Current market valuation across all asset holdings
                </p>
            </div>


            <div className="p-5 bg-white border border-gray-400 rounded-lg flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500  tracking-wider">
                            Total Investment
                        </p>
                        <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md">
                            <PiggyBank size={16} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(summary.totalInvestment)}
                    </h3>
                </div>
                <p className="text-[11px] text-gray-500 mt-3">
                    Total capital deployed into your active portfolio
                </p>
            </div>

            <div className="p-5 bg-white border border-gray-400 rounded-lg flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500  tracking-wider">
                            Total Gain / Loss
                        </p>
                        <div
                            className={`p-1.5 rounded-md ${isPositive
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                                }`}
                        >
                            {isPositive ? (
                                <TrendingUp size={16} />
                            ) : (
                                <TrendingDown size={16} />
                            )}
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                        <h3
                            className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {isPositive ? "+" : ""}
                            {formatCurrency(summary.totalChange)}
                        </h3>
                        <span
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${isPositive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                        >
                            {isPositive ? "+" : ""}
                            {summary.totalChangePercent.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-3">
                    Overall return yield since initial purchase
                </p>
            </div>
        </div>
    );
};