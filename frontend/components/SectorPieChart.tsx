
"use client";

import React from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";


interface SectorChartData {
    sector: string;
    totalInvestment: number;
    totalPresentValue: number;
}

interface PortfolioChartsProps {
    data: SectorChartData[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#6366F1"];

export const SectorPieChart: React.FC<PortfolioChartsProps> = ({ data }) => {
    return <div className="bg-white p-5  border  shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Sector Allocation (Present Value)
        </h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="totalPresentValue"
                        nameKey="sector"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any) => [
                            `₹${value.toLocaleString("en-IN")}`,
                            "Present Value",
                        ]}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
};