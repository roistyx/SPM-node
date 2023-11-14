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
    const reportType = req.params.reportType; // bs, ic, cf
    const symbol = req.params.symbol;

    switch (reportType) {
      case 'bs':
        req.reportName = 'Balance Sheet';
        break;
      case 'ic':
        req.reportName = 'Income Statement';
        break;
      case 'cf':
        req.reportName = 'Cash Flow Statement';
        break;
      default:
      // Handle default case or error
    }

    console.log(req.reportName);

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
      { symbol: symbol },
      async (error, data) => {
        if (error) {
          console.error('Error fetching financials:', error.message);
          return res
            .status(500)
            .json({ error: 'Failed to fetch financials.' });
        }

        try {
          req.userRequestedReport = data.data[0].report[reportType];
          req.requestedFinancialReport = data.data[0];
          console.log(
            'req.userRequestedReport',
            req.userRequestedReport
          );

          const response =
            await OpenAiInquiryController.GenerateCashFlowStatement(
              req,
              res
            );
          const cleanHtml = sanitizeHtml(response, {
            allowedTags: ['h1', 'p', 'strong', 'em', 'br'],
          });

          return res.status(200).json(marked.parse(cleanHtml));
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
