// components/PortfolioCharts.tsx
"use client";

import React from "react";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";


interface SectorChartData {
    sector: string;
    totalInvestment: number;
    totalPresentValue: number;
}

interface PortfolioChartsProps {
    data: SectorChartData[];
}
export const SectorBarChart: React.FC<PortfolioChartsProps> = ({ data }) => {
    return <div className="bg-white p-5  border  shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Sector Performance: Cost vs. Value
        </h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="sector" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value: any) => `₹${value.toLocaleString("en-IN")}`}
                    />
                    <Legend />
                    <Bar dataKey="totalInvestment" name="Investment" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalPresentValue" name="Present Value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
};