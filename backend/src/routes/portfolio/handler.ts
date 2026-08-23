import type { Request, Response } from "express";
import { getHoldingsService } from "./service.js";

export const getHoldingsHandler = async (req: Request, res: Response) => {
  try {
    const response = await getHoldingsService();

    return res.status(200).json({
      success: true,
      message: "Holdings fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};
