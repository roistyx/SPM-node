const finnhub = require('finnhub');
const FinancialsDao = require('../models/FinancialsDao');
const OpenAiInquiryController = require('./OpenAiInquiryController');
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
    // console.log('req.symbolSearchResult', req.symbolSearchResult);
    const reportType = req.params.report_type; // bs, ic, cf
    const symbol = req.params.symbol;
    const { start_date, end_date, quarter } = req.params;

    console.log('reportType', start_date, end_date, quarter);

    const existingData = await FinancialsDao.findReportBySymbol(
      symbol
    );

    // if (existingData && existingData.data) {
    //   console.log('Data retrieved from MongoDB.');
    //   return res.status(200).json(existingData.data);
    // }

    const api_key =
      finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.financialsReported(
      {
        symbol: symbol,
        freq: quarter === '0' ? 'annual' : 'quarterly',
        from: start_date,
        to: end_date,
        // freq: 'annual',
      },
      async (error, data) => {
        if (error) {
          console.error('Error fetching financials:', error.message);
          return res
            .status(500)
            .json({ error: 'Failed to fetch financials.' });
        }

        try {
          const reportFeedback = data.data[0].report[reportType];
          req.requestedFinancialReport = data.data[0];
          const { name: companyName } = req.symbolSearchResult;
          const { filedDate, symbol, year, quarter } =
            req.requestedFinancialReport;

          // const response = // needs error hand
          //   await OpenAiInquiryController.GenerateFinancialStatement(
          //     req,
          //     res
          //   );

          const response = {
            // reportName: '2024_0',
            // symbol: 'PFE',
            // companyName: 'Walmart',
            // reportType: 'bs',
            // filedDate: '2023-02-22 00:00:00',
            financial_report: data.data, // 0 is Q3, 1 is Q2, 2 is Q1, 3 is nothing
          };
          // console.log(
          //   'req.requestedFinancialReport',
          //   req.requestedFinancialReport
          // );
          const cleanHtml = sanitizeHtml(response, {
            allowedTags: ['h1', 'p', 'strong', 'em', 'br'],
          });

          const financialReportObject = {
            report_name: year + '_' + quarter,
            symbol: symbol,
            company_name: companyName,
            report_type: reportType,
            filed_date: filedDate,
            financial_report: marked.parse(cleanHtml),
          };

          // console.log(
          //   'financialReportObject',
          //   financialReportObject.financial_report
          // );
          financialReportObject.reportFeedback;
          // console.log('reportFeedback', reportFeedback);

          // return res.status(200).json(financialReportObject);
          return res.status(200).json(response);
        } catch (error) {
          console.error('Error fetching financials:', error.message);
          return res
            .status(500)
            .json({ error: 'Failed to fetch financials.' });
        }
      }
    );
  }

  static async getQuote() {}

  static async getCompanyProfile() {}

  static async getCompanyQuoteAndProfile(req, res) {}
}

module.exports = FinnhubController;
