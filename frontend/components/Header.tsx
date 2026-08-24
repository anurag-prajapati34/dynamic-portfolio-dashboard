'use client'
import { RotateCw } from 'lucide-react'
import React from 'react'

interface HeaderProps {
    lastUpdated: string
    isFetching: boolean
    onRefresh: () => void
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, isFetching, onRefresh }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
                <p className="text-sm text-gray-500 mt-0.5">Real-time asset tracking & performance insights</p>
            </div>

            <div className="flex items-center space-x-4">

                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Live Sync (15s)</span>
                </div>

                <button
                    onClick={onRefresh}
                    disabled={isFetching}
                    className="flex items-center space-x-1.5 text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    <RotateCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>
        </div>
    )
}