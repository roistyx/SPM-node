const StockDao = require('../models/StockNewsDao.js');

class StocksController {
  static async saveFinancialReported(req, res) {
    // console.log('req.body', req.body);
    const { report_type } = req.body.report;
    console.log('req.body', req.body.report);

    try {
      const result = await StockDao.createFinancialReportEntry(
        req.body.report
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json('Something went wrong', err);
    }
  }

  static async retrieveFinancialReportList(req, res) {
    const symbol = req.params.symbol;
    const reportType = req.params.report_type;
    console.log('Stock controller', symbol, reportType);

    try {
      const result = await StockDao.getFinancialReportList(
        symbol,
        reportType
      );
      // console.log('Stock Controller', result);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json('Something went wrong', err);
    }
  }

  static async retrieveChatLog(req, res) {
    const symbol = req.params.symbol;
    // console.log('req.params.symbol', symbol);
    try {
      const result = await StockDao.getStockChatLog(symbol);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json('Something went wrong', err);
    }
  }

  static async saveChatLog(req, res) {
    console.log('req.body', req.body);
    try {
      const result = await StockDao.createUserChatLog(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json('Something went wrong', err);
    }
  }

  static async saveStockNews(req, res) {
    // console.log("req.body", req.body);
    try {
      const result = await StockDao.createNewsEntry(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json('Something went wrong', err);
    }
  }
}

module.exports = StocksController;
