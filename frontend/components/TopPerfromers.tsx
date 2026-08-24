import { Holding } from "@/utils/types";
import { PortfolioTable } from "./PortfolioTable";

export async function TopPerformers(
    { holdings }: { holdings: Holding[] }
) {
    return (
        <div>
            <PortfolioTable data={holdings} />
        </div>
    )
}