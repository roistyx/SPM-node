const finnhub = require('finnhub');

async function getSymbolSearch(req, res, next) {
  const symbol = req.params.symbol;
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

  //   finnhubClient.companyProfile2(
  //     { symbol: symbol },
  //     (error, data, response) => {
  //       if (error) {
  //         console.error(error);
  //         return res
  //           .status(500)
  //           .json({ error: 'Failed to fetch financials.' });
  //       }
  //       console.log(data);
  //       req.symbolSearchResult = data;
  //       next();
  //     }
  //   );

  //   finnhubClient.companyProfile2(
  //     { symbol: symbol },
  //     (error, data, response) => {
  //       console.log('API Response:', data); // Debug log
  //       console.log('API Error:', error); // Error log
  //       if (error) {
  //         console.error('Error in symbol search:', error);
  //         res.status(500).send('Error during symbol search');
  //         return;
  //       }
  //       req.symbolSearchResult = data;
  //       next();
  //     }
  //   );
}

module.exports = getSymbolSearch;
