import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ExpressResponseInterface } from "typings/express";
import { CoinGeckoClient } from "coingecko-api-v3";

export class MarketController {
  static async getMarkets(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const client = new CoinGeckoClient(
      {
        timeout: 10000,
        autoRetry: true,
      }, 
      "CG-7EdVVjaXWFvsULwKTzEGmuxj"
      );

      const coinMarket = await client.coinMarket({
        vs_currency: "usd",
        page: parseInt(req.query.page as string),
        per_page: parseInt(req.query.perPage as string),
      });

      const marketData = await client.global();
      const attributes = [
        "id",
        "symbol",
        "name",
        "image",
        "current_price",
        "high_24h",
        "low_24h",
        "price_change_percentage_24h",
      ];

      const filteredCoins = coinMarket.map((coin: any) => {
        return attributes.reduce((acc: any, attr) => {
          acc[attr] = coin[attr];
          return acc;
        }, {});
      });

      return res
        .status(httpStatus.OK)
        .json({ msg: "success", status: httpStatus.OK, data: {coins: filteredCoins, total: marketData.data.active_cryptocurrencies}, });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

  static async getCoin(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const id = req.params.id;

      const client = new CoinGeckoClient({
        timeout: 10000,
        autoRetry: true,
      }, 
      "CG-7EdVVjaXWFvsULwKTzEGmuxj"
      );

      const coinDetails = await client.coinId({
        id,
        market_data: true,
        community_data: false,
        developer_data: false,
        tickers: false,
        localization: false,
      });

      const data = {
        current_price: coinDetails.market_data?.current_price
          ? coinDetails.market_data.current_price["usd"]
          : null,
        image: coinDetails.image?.small,
        name: coinDetails.name,
        description: coinDetails.description?.en,
        price_change_percentage: {
          "24h": coinDetails.market_data?.price_change_percentage_24h,
          "7d": coinDetails.market_data?.price_change_percentage_7d,
          "14d": coinDetails.market_data?.price_change_percentage_14d,
          "30d": coinDetails.market_data?.price_change_percentage_30d,
          "60d": coinDetails.market_data?.price_change_percentage_60d,
          "200d": coinDetails.market_data?.price_change_percentage_200d,
          "1y": coinDetails.market_data?.price_change_percentage_1y,
        },
        high_24h: coinDetails.market_data?.high_24h
          ? coinDetails.market_data.high_24h["usd"]
          : null,
        low_24h: coinDetails.market_data?.low_24h
          ? coinDetails.market_data.low_24h["usd"]
          : null,
      };

      return res
        .status(httpStatus.OK)
        .json({ msg: `ID is ${id}`, status: httpStatus.OK, data });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }
}
