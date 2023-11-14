require('dotenv').config();
const axios = require('axios');

class GetQuotesController {
  static async getPolygonAggregates(req, res) {
    const { searchQuery: symbol, interval, multiplier } = req.body;
    const { startDate, endDate } = req.formattedObj;
    const endpoint = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${interval}/${startDate}/${endDate}?adjusted=true&sort=asc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`;
    try {
      const response = await axios.get(endpoint);
      const historical_data = response.data.results.map((item) => ({
        number_transactions: item.n,
        date: item.t,
        date_US: new Date(item.t).toLocaleDateString('en-US'),
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
        volume: item.v,
        weighted_average_price: item.vw,
        volume_time_period: item.v,
      }));
      console.log(historical_data);

      return res.status(200).json(historical_data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch stock data' });
    }
  }

  static async getPolygonStockData(req, res) {
    const symbol = req.symbol;
    const date = req.params.date;
    const endpoint_open_close = `https://api.polygon.io/v1/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`;
    const endpoint_ticker_details_V3 = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${process.env.POLYGON_API_KEY}`;

    try {
      const [openCloseResponse, tickerDetailsResponse] =
        await Promise.all([
          axios.get(endpoint_open_close),
          axios.get(endpoint_ticker_details_V3),
        ]);

      const combinedData = {
        dailyOpenClose: openCloseResponse.data,
        tickerDetails: tickerDetailsResponse.data.results,
      };

      const { dailyOpenClose, tickerDetails } = combinedData;

      const stockData = {
        symbol: dailyOpenClose.symbol,
        last_trade_day: dailyOpenClose.from,
        previous_close: dailyOpenClose.close,
        volume: dailyOpenClose.volume,
        company_name: tickerDetails.name,
        financial_instrument: tickerDetails.market,
        primary_exchange: tickerDetails.primary_exchange,
        currency_name: tickerDetails.currency_name,
        market_cap: tickerDetails.market_cap,
        description: tickerDetails.description,
        sic_description: tickerDetails.sic_description,
        homepage_url: tickerDetails.homepage_url,
        total_employees: tickerDetails.employees,
        list_date: tickerDetails.list_date,
        icon_url: tickerDetails.branding.icon_url,
        logo_url: tickerDetails.branding.logo_url,
      };
      console.log('', dailyOpenClose);

      return res.status(200).json(stockData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Failed to fetch stock data' });
    }
  }

  static async getPolygonStockFinancials(req, res) {
    console.log('getPolygonStockFinancials', req.params.symbol);
    const symbol = req.params.symbol;

    try {
      const endpoint = `https://api.polygon.io/vX/reference/financials?ticker=${symbol}&filing_date=2023-09-14&period_of_report_date=2023-09-14&timeframe=annual&limit=10&apiKey=${process.env.POLYGON_API_KEY}`;
      const response = await axios.get(endpoint);
      console.log(response.data);
      return res.status(200).json(response.data);
    } catch (error) {
      console.log('Error fetching stock data:', error);
      res.status(500).json({ message: 'Failed to fetch stock data' });
    }
  }
}

module.exports = GetQuotesController;

// static async getStockData(req, res) {
//     const symbol = req.params.symbol;
//     // console.log("symbol", symbol);
//     // try {
//     //   const endpoint = `https://api.twelvedata.com/time_series?apikey=${process.env.TWELVE_DATA_API_KEY}&interval=1min&symbol=${symbol}`;
//     //   const response = await axios.get(endpoint);
//     //   return response.data;
//     // } catch (error) {
//     //   console.error("Error fetching stock data:", error);
//     //   throw error;
//     // }

//     const API_URL = "https://api.twelvedata.com/time_series";
//     const INTERVAL = "1day";
//     const PREVIOUS_CLOSE = true;
//     const OUTPUTSIZE = "1";

//     axios
//       .get(API_URL, {
//         params: {
//           apikey: process.env.TWELVE_DATA_API_KEY,
//           interval: INTERVAL,
//           symbol: symbol,
//           previous_close: PREVIOUS_CLOSE,
//           outputsize: OUTPUTSIZE,
//         },
//       })
//       .then((response) => {
//         const stockData = {
//           symbol: response.data.meta.symbol,
//           displayName: response.data.meta.symbol,
//           previousClose: response.data.values[0].previous_close,
//           timestamp: response.data.values[0].datetime,
//         };

//         res.status(200).json(stockData);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from Twelve Data API:", error);
//       });
//   }
