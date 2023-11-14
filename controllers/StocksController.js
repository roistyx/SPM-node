const StockDao = require("../models/StockNewsDao.js");


class StocksController {

  static async retrieveChatLog(req, res) {
    const symbol = req.params.symbol;
    console.log("req.params.symbol", symbol);
    try {
      const result = await StockDao.getStockChatLog(symbol);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json("Something went wrong", err);
    }
  }

  static async saveChatLog(req, res) {
    console.log("req.body", req.body);
    try {
      const result = await StockDao.createUserChatLog(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json("Something went wrong", err);
    }
  }

  static async saveStockNews(req, res) {
    // console.log("req.body", req.body);
    try {
      const result = await StockDao.createNewsEntry(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Something went wrong", err);
    }
  }
}

module.exports = StocksController;
