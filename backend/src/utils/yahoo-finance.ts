import { error } from "node:console";
import yahooFinance from "yahoo-finance2";

export const getStockDetailsFromYahooFinance = async (symbol: string[]) => {
  try {
    const yf = new yahooFinance();
    return await yf.quote(symbol);
  } catch (e) {
    console.log(e);
    throw error;
  }
};
