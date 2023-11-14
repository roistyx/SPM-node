const yahooFinance = require("yahoo-finance2").default;

class YahooFinanceController {
  static async HistoricalData(req, res) {
    const { symbol, startDate, endDate } = req.formattedObj;
    const interval = req.query.interval;
    // console.log(interval);
    console.log("req.formattedObj", req.formattedObj);

    let retries = 5;
    const retryInterval = 3000; // 3 seconds

    while (retries > 0) {
      try {
        console.log("Searching for historical data");

        const queryOptions = {
          period1: startDate,
          period2: endDate,
          interval: interval, // 1d, 1wk, 1mo
        };

        const moduleOptions = {
          modules: ["summaryProfile", "financialData", "calendarEvents"],
        };

        const result = await yahooFinance._chart(
          symbol,
          queryOptions,
          moduleOptions
        );

        console.log("Result was successful after " + retries + " attempts.");

        return res.status(200).json(result);
      } catch (err) {
        console.log("Error in Yahoo Finance", err);
        retries--;

        if (retries === 0) {
          return res.status(500).json(err);
        }

        console.log(
          `Failed: remaining attempts ${retries}. Retrying in ${
            retryInterval / 1000
          } seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }
    }
  }
}

module.exports = YahooFinanceController;
