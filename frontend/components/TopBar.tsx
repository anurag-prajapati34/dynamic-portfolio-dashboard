import { Currency, Menu } from "lucide-react"

export const TopBar = ({ onMenuClick }: { onMenuClick?: () => void }) => {


    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-12  border-b border-gray-400  flex items-center justify-between px-4  text-black bg-white">

            <div className="flex items-center gap-2 w-auto md:w-56">
                <button
                    onClick={onMenuClick}
                    className="p-1 -ml-1 text-gray-950 hover:bg-gray-100 hover:text-gray-950 rounded md:hidden hover:cursor-pointer transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu size={18} />
                </button>
                <div className="flex items-center gap-2 hover:cursor-pointer">
                    <div className="w-6 h-6  bg-gray-950 flex items-center justify-center shrink-0">
                        <Currency size={13} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-950 tracking-tight">
                        Portfolio
                    </span>
                </div>
            </div>


            {/* <div className="flex items-center gap-2 w-auto md:w-56 justify-end font-bold font-serif">
                Anurag Prajapati
            </div> */}
        </header>
    )
}

