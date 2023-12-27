const finnhub = require('finnhub');

async function getSymbolSearch(req, res, next) {
  const symbol = req.params.symbol;
  reportType = req.params.report_type;
  const api_key =
    finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.FINHUB_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.companyProfile2(
    { symbol: symbol.toUpperCase() },
    (error, data, response) => {
      if (error) console.error(error);
      req.symbolSearchResult = data;

      next();
    }
  );
}

module.exports = getSymbolSearch;
