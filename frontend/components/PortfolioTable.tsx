import { Holding } from "@/utils/types";
import type { ColumnDef } from "@tanstack/react-table";
import { tableFeatures, useTable } from "@tanstack/react-table";
import React, { useMemo } from "react";


interface PortfolioTableProps {
    data: Holding[];
}

const features = tableFeatures({});

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ data }) => {
    const columns = useMemo<Array<ColumnDef<typeof features, Holding>>>(
        () => [
            {
                accessorKey: "particulars",
                header: "Particulars",
                cell: (info) => (
                    <span className="font-semibold text-gray-900">{info.getValue<string>()}</span>
                ),
            },
            {
                accessorKey: "symbol",
                header: "Code",
                cell: (info) => (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                        {info.getValue<string>() || "N/A"}
                    </span>
                ),
            },
            {
                accessorKey: "purchasePrice",
                header: "Purchase Price",
                cell: (info) => `₹${info.getValue<number>().toLocaleString("en-IN")}`,
            },
            {
                accessorKey: "qty",
                header: "Qty",
                cell: (info) => info.getValue<number>(),
            },
            {
                accessorKey: "investment",
                header: "Investment",
                cell: (info) => `₹${info.getValue<number>().toLocaleString("en-IN")}`,
            },
            {
                accessorKey: "portfolioPercentage",
                header: "Portfolio (%)",
                cell: (info) => {
                    const val = info.getValue<number>();
                    return val ? `${(val * 100).toFixed(2)}%` : "-";
                },
            },
            {
                accessorKey: "currentMarketPrice",
                header: "CMP",
                cell: (info) => (
                    <span className="font-semibold text-blue-600">
                        ₹{info.getValue<number>()?.toLocaleString("en-IN") ?? "0.00"}
                    </span>
                ),
            },
            {
                accessorKey: "currentValue",
                header: "Present Value",
                cell: (info) => (
                    <span className="font-medium text-gray-900">
                        ₹{info.getValue<number>()?.toLocaleString("en-IN") ?? "0.00"}
                    </span>
                ),
            },
            {
                accessorKey: "gainLoss",
                header: "Gain / Loss",
                cell: (info) => {
                    const val = info.getValue<number>() ?? 0;
                    const isPositive = val >= 0;
                    return (
                        <span
                            className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {isPositive ? "+" : ""}₹{val.toLocaleString("en-IN")}
                        </span>
                    );
                },
            },
            {
                accessorKey: "peRatio",
                header: "P/E Ratio",
                cell: (info) => info.getValue<number | null>() ?? "-",
            },
            {
                accessorKey: "latestEarnings",
                header: "Latest Earnings",
                cell: (info) => {
                    const val = info.getValue<number | null>();
                    return val !== null ? `₹${val}` : "-";
                },
            },
        ],
        []
    );

    const table = useTable({
        key: "portfolio-table",
        features,
        columns,
        data,
    });

    return (
        <div className="overflow-x-auto border rounded-xl border-gray-400">
            <table className="min-w-full divide-y divide-gray-400 text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 font-semibold">
                                    {header.isPlaceholder ? null : (
                                        <table.FlexRender header={header} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            {row.getAllCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                                    <table.FlexRender cell={cell} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};