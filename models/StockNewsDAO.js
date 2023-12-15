// injectDB injects this connection to the database
const { response } = require('express');
const { ObjectId } = require('mongodb');

let newsCollection;
let userChatLog;
let financialReports;

module.exports = class StockDao {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      newsCollection = await connection.collection('news');
      userChatLog = await connection.collection('chatLog');
      financialReports = await connection.collection(
        'financialReports'
      );
      console.log('Connected to MongoDB Stocks collection');
    } catch (err) {
      console.log(
        `Unable to establish a collection handle in StocksNewsDAO: ${err}`
      );
    }
  }
  static async getUserById(UserId) {
    console.log('UserId', UserId);
    // return await collection.findOne({ _id: new ObjectId(UserId) });
    // return console.log('UserId', UserId);

    try {
      const userObject = await newsCollection.findOne({
        _id: new ObjectId(UserId),
      });
      console.log('userObject', userObject);
      return userObject;
    } catch (err) {
      console.log('Error in getUserById: ', err);
      return { error: err };
    }
    return;
  }

  static async createNewsEntry(newsData) {
    console.log('saveStockNews', newsData);
    return await newsCollection.insertOne({ ...newsData });
  }

  static async findNewsBySymbol(symbol) {
    console.log('findNewsBySymbol', symbol);
    try {
      const newsEntry = await newsCollection.findOne({
        symbol: symbol,
      });
      if (!newsEntry) {
        console.log(`No news entry found for symbol: ${symbol}`);
        return false;
      }
      console.log(`News entry found for symbol: ${symbol}`);
      return true;
    } catch (err) {
      console.error(`Error in findNewsBySymbol: ${err}`);
      return { error: err };
    }
  }

  static async createFinancialReportEntry(reportData) {
    // console.log('saveFinancialReported', reportData);
    const {} = reportData;
    const response = await financialReports.insertOne({
      ...reportData,
    });
    console.log('Saved', response);
    return;
  }

  static async getFinancialReportList(symbol) {
    // console.log('getFinancialReportList', symbol, reportType);
    try {
      const query = { symbol: symbol };
      const documents = await financialReports.find(query).toArray();

      console.log('Matching documents', documents.length);

      return documents;
    } catch (err) {
      console.log('Error in getFinancialReportList: ', err);
      return { error: err };
    }
  }

  static async createUserChatLog(chatLog) {
    console.log('save userChatLog', chatLog);
    return await userChatLog.insertOne({ ...chatLog });
  }

  static async getStockChatLog(symbol) {
    console.log('getStockChatLog', symbol);
    const query = {
      chatLog: {
        $elemMatch: {
          'userDataAndChatLog.userContext.symbol': symbol,
        },
      },
    };

    try {
      // Use the find method to get a cursor
      const cursor = await userChatLog.find(query);

      // Use the toArray method to get all matching documents as an array
      const documents = await cursor.toArray();

      console.log('Matching documents', documents);
      return documents;
    } catch (err) {
      console.log('Error in getStockChatLog: ', err);
      return { error: err };
    }
  }

  static async findSavedSymbols() {
    try {
      // Using aggregation to get unique symbols from each collection
      const newsSymbols = await newsCollection
        .aggregate([
          { $group: { _id: '$symbol' } },
          { $project: { _id: 0, symbol: '$_id' } },
        ])
        .toArray()
        .then((docs) => docs.map((doc) => doc.symbol));

      const financialReportSymbols = await financialReports
        .aggregate([
          { $group: { _id: '$symbol' } },
          { $project: { _id: 0, symbol: '$_id' } },
        ])
        .toArray()
        .then((docs) => docs.map((doc) => doc.symbol));

      const chatLogSymbols = await userChatLog
        .aggregate([
          { $unwind: '$chatLog' },
          {
            $group: {
              _id: '$chatLog.userDataAndChatLog.userContext.symbol',
            },
          },
          { $project: { _id: 0, symbol: '$_id' } },
        ])
        .toArray()
        .then((docs) => docs.map((doc) => doc.symbol));

      // Combine and remove duplicates
      const allSymbols = [
        ...new Set([
          ...newsSymbols,
          ...financialReportSymbols,
          ...chatLogSymbols,
        ]),
      ];

      return allSymbols;
    } catch (err) {
      console.error(`Error in findSavedSymbols: ${err}`);
      return { error: err };
    }
  }

  static async deleteNewsDocument(userId, petId) {}
};
