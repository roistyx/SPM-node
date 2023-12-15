const finnhub = require('finnhub');
const FinancialsDao = require('../models/FinancialsDao');
const OpenAiInquiryController = require('./OpenAiInquiryController');
const { sendErrorResponse } = require('../helpers/errorUtils');
const marked = require('marked');
const sanitizeHtml = require('sanitize-html');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

class FinnhubController {
  static async FinancialsAsReported(req, res) {
    const reportType = req.params.report_type; // bs, ic, cf
    const symbol = req.params.symbol;
    const { start_date, end_date, quarter } = req.params;
    console.log(
      'received query for',
      symbol,
      start_date,
      end_date,
      quarter,
      reportType
    );

    const mapQuarterToFrequency = () => {
      switch (quarter) {
        case '3':
          return '0';
        case '2':
          return '1';
        case '1':
          return '2';
        default:
          return '0';
      }
    };

    const existingData = await FinancialsDao.findReportBySymbol(
      symbol
    );

    if (existingData && existingData.data) {
      console.log('Data retrieved from MongoDB.');
      return res.status(200).json(existingData.data);
    }

    const api_key =
      finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.financialsReported(
      {
        symbol: symbol,
        freq: quarter == 0 ? 'annual' : 'quarterly',
        from: start_date,
        to: end_date,
      },
      async (error, data, response) => {
        if (error) {
          console.error(
            'Error fetching financials in FinhubController:',
            error.message
          );
          sendErrorResponse(res, 500, "Couldn't fetch financials.");
          return;
        }

        console.log('Finnhub API Response:', response);
        console.log('Finnhub API Data:', data);

        try {
          if (!data.symbol) {
            sendErrorResponse(
              res,
              200,
              'No data found for this symbol.'
            );
            return;
          }

          if (
            !data.data[quarter == 0 ? 0 : mapQuarterToFrequency()]
          ) {
            sendErrorResponse(
              res,
              200,
              'No data found for these dates.'
            );
            return;
          }

          req.requestedFinancialReport =
            data.data[quarter == 0 ? 0 : mapQuarterToFrequency()];
          const { name: companyName } = req.symbolSearchResult;
          const { filedDate, year, startDate, endDate } =
            req.requestedFinancialReport;

          const response = // needs error hand
            await OpenAiInquiryController.GenerateFinancialStatement(
              req,
              res,
              quarter
            );

          const cleanHtml = sanitizeHtml(response, {
            allowedTags: ['h1', 'p', 'strong', 'em', 'br'],
          });

          const financialReportObject = {
            startDate: startDate,
            endDate: endDate,
            report_name: year + '_' + quarter,
            symbol: symbol,
            company_name: companyName,
            quarter: quarter,
            report_type: reportType,
            filed_date: filedDate,
            financial_report: marked.parse(cleanHtml),
          };

          return res.status(200).json(financialReportObject);
          // return res.status(200).json('response');
        } catch (error) {
          console.error(
            'Error processing financials:',
            error.message
          );
          if (!res.headersSent) {
            return res.status(500).json({
              error: 'Failed to process Financials As Reported.',
              status: 500,
            });
          }
        }
      }
    );
  }

  static async getCompanyNews(req, res) {
    console.log('getCompanyNews');
    try {
      const api_key =
        finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = process.env.FINHUB_API_KEY;
      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.companyNews(
        'PFE',
        '2023-01-01',
        '2023-05-01',
        async (error, data, response) => {
          if (error) {
            console.error(
              'Error fetching company news in FinnhubController:',
              error.message
            );
            sendErrorResponse(res, 500, "Couldn't fetch news.");
            return;
          }
          console.log('Finnhub API Response:', data);
          return res.status(200).json(data);
        }
      );
    } catch (error) {
      console.error(
        'Error fetching company news in FinnhubController:',
        error.message
      );
      sendErrorResponse(res, 500, "Couldn't fetch news.");
      return;
    }
  }

  static async getQuote() {}

  static async getCompanyProfile() {}

  static async getCompanyQuoteAndProfile(req, res) {}
}

module.exports = FinnhubController;
