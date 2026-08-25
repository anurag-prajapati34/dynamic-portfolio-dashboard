'use client'

import { ChevronRight, CircleDollarSign, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    {
        path: '/',
        name: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        path: '/holdings',
        name: 'Holdings',
        icon: CircleDollarSign,
    },
]

export const Sidebar = ({
    isOpen,
    onClose,
}: {
    isOpen?: boolean
    onClose?: () => void
}) => {
    const pathname = usePathname()

    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={onClose}
                />
            )}


            <aside
                className={`
          fixed md:relative  md:top-0 left-0 h-full md:h-full w-52 bg-white border-r border-gray-200 flex flex-col z-50 md:z-auto
          transition-transform duration-300 ease-in-out shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive =
                            pathname === item.path ||
                            (item.path !== '/' && pathname.startsWith(item.path + '/'))

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={onClose}
                                className={`
                  group flex items-center gap-3 px-3 py-2 text-sm rounded-lg
                  transition-all duration-150 relative cursor-pointer
                  ${isActive
                                        ? 'bg-gray-950 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                                    }
                `}
                            >

                                <Icon
                                    size={16}
                                    className={`shrink-0 transition-colors ${isActive
                                        ? 'text-white'
                                        : 'text-gray-500 group-hover:text-gray-800'
                                        }`}
                                />


                                <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                                    {item.name}
                                </span>


                                {isActive && (
                                    <ChevronRight size={13} className="ml-auto text-gray-300" />
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}