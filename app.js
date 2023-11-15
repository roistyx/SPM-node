require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAiInquiryController = require('./controllers/OpenAiInquiryController');
const extractArticleMiddleware = require('./middlewares/extractArticleMiddleware');
// const OpenAiPromptController = require("./controllers/OpenAiPromptController");
const OpenAiExtractController = require('./controllers/OpenAiExtractController');
const path = require('path');
const YahooFinanceController = require('./controllers/YahooFinanceController');
const GoogleFinanceController = require('./controllers/GoogleFinanceController');
const GetQuotesController = require('./controllers/GetQuotesController');
const StocksController = require('./controllers/StocksController');
const FinnhubController = require('./controllers/FinnhubController');
const getSymbolSearch = require('./middlewares/symbolSearchMiddleware');
const dateValidatorMiddleware = require('./middlewares/dateFormatMiddleware');
const convertToUppercaseMiddleware = require('./middlewares/convertUppercaseMiddleware');
const { InitDB } = require('./models/init.js');
const { InitDBAtlas } = require('./models/initAtlas.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// InitDB();

InitDBAtlas();

app.use(express.json());
app.use(express.static('public'));

app.post('/extract', extractArticleMiddleware);

app.get('/stock-news/:symbol', GoogleFinanceController.getNews);
app.post('/summarize', OpenAiInquiryController.SummarizeOpenAi);
app.post('/chatBot', OpenAiInquiryController.ChatBotOpenAi);

app.post(
  '/historical',
  dateValidatorMiddleware,
  GetQuotesController.getPolygonAggregates
);

app.get(
  '/stock-data/:symbol/:date',
  convertToUppercaseMiddleware,
  GetQuotesController.getPolygonStockData
);

app.get(
  '/stock-financials/:reportType/:symbol',

  getSymbolSearch,
  FinnhubController.FinancialsAsReported
);

app.post('/save-article', StocksController.saveStockNews);
app.post('/save-report', StocksController.saveFinancialReported);
app.get(
  '/financial-report-list/:symbol',
  StocksController.retrieveFinancialReportList
);

app.post('/save-user-chat-log', StocksController.saveChatLog);
app.get(
  '/retrieve-stock-chat-log/:symbol',
  StocksController.retrieveChatLog
);
app.post(
  '/generate-statement/:symbol',
  OpenAiInquiryController.GenerateCashFlowStatement
);

// app.use(OpenAiPromptController.PromptLine);

app.listen(3100, () => {
  console.log('Server is running on port 3100');
});
