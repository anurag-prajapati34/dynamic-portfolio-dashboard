"use client";

import React, { useMemo, useState } from "react";
import {
    type ColumnDef,
    type SortingState,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Holding } from "@/utils/types";

interface PortfolioTableProps {
    data: Holding[];
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ data }) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo<ColumnDef<Holding>[]>(
        () => [
            {
                accessorKey: "particulars",
                header: "Particulars",
                enableSorting: false,
                cell: (info) => (
                    <span className="font-semibold text-gray-900">
                        {info.getValue<string>()}
                    </span>
                ),
            },
            {
                accessorKey: "symbol",
                header: "Code",
                enableSorting: false,
                cell: (info) => (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                        {info.getValue<string>() || "N/A"}
                    </span>
                ),
            },
            {
                accessorKey: "purchasePrice",
                header: "Purchase Price",
                enableSorting: true,
                cell: (info) => `₹${info.getValue<number>()?.toLocaleString("en-IN")}`,
            },
            {
                accessorKey: "qty",
                header: "Qty",
                enableSorting: true,
                cell: (info) => info.getValue<number>(),
            },
            {
                accessorKey: "investment",
                header: "Investment",
                enableSorting: true,
                cell: (info) => `₹${info.getValue<number>()?.toLocaleString("en-IN")}`,
            },
            {
                accessorKey: "portfolioPercentage",
                header: "Portfolio (%)",
                enableSorting: true,
                cell: (info) => {
                    const val = info.getValue<number>();
                    return val ? `${(val * 100).toFixed(2)}%` : "-";
                },
            },
            {
                accessorKey: "currentMarketPrice",
                header: "CMP",
                enableSorting: true,
                cell: (info) => (
                    <span className="font-semibold text-blue-600">
                        ₹{info.getValue<number>()?.toLocaleString("en-IN") ?? "0.00"}
                    </span>
                ),
            },
            {
                accessorKey: "currentValue",
                header: "Present Value",
                enableSorting: true,
                sortDescFirst: true,
                cell: (info) => (
                    <span className="font-medium text-gray-900">
                        ₹{info.getValue<number>()?.toLocaleString("en-IN") ?? "0.00"}
                    </span>
                ),
            },
            {
                accessorKey: "gainLoss",
                header: "Gain / Loss",
                enableSorting: true,
                sortDescFirst: true,
                cell: (info) => {
                    const val = info.getValue<number>() ?? 0;
                    const isPositive = val >= 0;
                    return (
                        <span className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                            {isPositive ? "+" : ""}₹{val.toLocaleString("en-IN")}
                        </span>
                    );
                },
            },
            {
                accessorKey: "peRatio",
                header: "P/E Ratio",
                enableSorting: true,
                cell: (info) => info.getValue<number | null>() ?? "-",
            },
            {
                accessorKey: "latestEarnings",
                header: "Latest Earnings",
                enableSorting: true,
                cell: (info) => {
                    const val = info.getValue<number | null>();
                    return val !== null ? `₹${val}` : "-";
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="overflow-x-auto border rounded-xl border-gray-400">
            <table className="min-w-full border-separate border-spacing-0 divide-y divide-gray-400 text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSortable = header.column.getCanSort();
                                const sortDir = header.column.getIsSorted();

                                return (
                                    <th key={header.id} className="px-4 py-3 font-semibold select-none">
                                        {header.isPlaceholder ? null : (
                                            <button
                                                type="button"
                                                className={`flex items-center gap-1.5 w-full text-left font-semibold ${isSortable ? "cursor-pointer hover:text-gray-950 transition-colors" : ""
                                                    }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {isSortable && (
                                                    <span className="shrink-0">
                                                        {sortDir === "asc" ? (
                                                            <ArrowUp size={13} className="text-gray-950" />
                                                        ) : sortDir === "desc" ? (
                                                            <ArrowDown size={13} className="text-gray-950" />
                                                        ) : (
                                                            <ArrowUpDown size={13} className="text-gray-400 opacity-60" />
                                                        )}
                                                    </span>
                                                )}
                                            </button>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};