import type { Request, Response } from "express";

export const getHoldingsHandler = (req: Request, res: Response) => {
  try {
    const response = [
      {
        particulars: "HDFC Bank",
        purchasePrice: 1490,
        qty: 50,
        investment: 74500,
        portfolioPercentage: 0.048281,
        exchange: "HDFCBANK",
        currentMarketPrice: 1700.15,
        currentValue: 85007.5,
        gainLoss: 10507.5,
        gainLossPercentage: 0.14104,
        marketCap: 1300795.862024,
        peRatio: 18.69,
        latestEarnings: 91.02,
        sector: "Financial Sector",
      },
      {
        particulars: "Bajaj Finance",
        purchasePrice: 6466,
        qty: 15,
        investment: 96990,
        portfolioPercentage: 0.062856,
        exchange: "BAJFINANCE",
        currentMarketPrice: 8419.6,
        currentValue: 126294,
        gainLoss: 29304,
        gainLossPercentage: 0.302134,
        marketCap: 521012.5074,
        peRatio: 32.63,
        latestEarnings: 257.8,
        sector: "Financial Sector",
      },
      {
        particulars: "ICICI Bank",
        purchasePrice: 780,
        qty: 84,
        investment: 65520,
        portfolioPercentage: 0.042461,
        exchange: "532174",
        currentMarketPrice: 1215.5,
        currentValue: 102102,
        gainLoss: 36582,
        gainLossPercentage: 0.558333,
        marketCap: 859583.562009,
        peRatio: 17.68,
        latestEarnings: 68.72,
        sector: "Financial Sector",
      },
      {
        particulars: "Bajaj Housing",
        purchasePrice: 130,
        qty: 504,
        investment: 65520,
        portfolioPercentage: 0.042461,
        exchange: "544252",
        currentMarketPrice: 112.85,
        currentValue: 56876.4,
        gainLoss: -8643.6,
        gainLossPercentage: -0.131923,
        marketCap: 138017.278871,
        peRatio: 85.72,
        latestEarnings: 2.53,
        sector: "Financial Sector",
      },
    ];

    return res.status(200).json({
      success: true,
      message: "Holdings fetched successfully",
      data: response,
    });
  } catch (error) {
    throw error;
  }
};
