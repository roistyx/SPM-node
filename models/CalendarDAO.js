// injectDB injects this connection to the database
const { response } = require('express');
const { ObjectId } = require('mongodb');

let calendar;

module.exports = class CalendarDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      calendar = await connection.collection('calendar');

      console.log('Connected to MongoDB calendar collection');
    } catch (err) {
      console.log(
        `Unable to establish a collection handle in CalendarDAO: ${err}`
      );
    }
  }
  static async getUserById(UserId) {
    console.log('UserId', UserId);
    // return await collection.findOne({ _id: new ObjectId(UserId) });
    // return console.log('UserId', UserId);

    try {
      const userObject = await calendar.findOne({
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
    return await calendar.insertOne({ ...newsData });
  }

  static async findSavedSymbols() {}

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
      // Function to aggregate symbols and company names from news and financialReports
      const aggregateData = async (
        collection,
        symbolField,
        companyNameField
      ) => {
        return await collection
          .aggregate([
            {
              $group: {
                _id: {
                  symbol: `$${symbolField}`,
                  companyName: `$${companyNameField}`,
                },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                symbol: '$_id.symbol',
                companyName: '$_id.companyName',
                count: 1,
              },
            },
          ])
          .toArray();
      };

      // Special aggregation for userChatLog to avoid counting duplicates within the same document
      const aggregateChatLogData = async () => {
        return await userChatLog
          .aggregate([
            { $unwind: '$chatLog' },
            {
              $group: {
                _id: {
                  symbol:
                    '$chatLog.userDataAndChatLog.userContext.symbol',
                  companyName:
                    '$chatLog.userDataAndChatLog.userContext.company_name',
                },
              },
            },
            {
              $group: {
                _id: '$_id.symbol',
                companyName: { $first: '$_id.companyName' },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                symbol: '$_id',
                companyName: 1,
                count: 1,
              },
            },
          ])
          .toArray();
      };

      // Aggregate data from each collection
      const newsData = await aggregateData(
        calendar,
        'symbol',
        'company_name'
      );
      const financialReportsData = await aggregateData(
        financialReports,
        'symbol',
        'company_name'
      );
      const chatLogData = await aggregateChatLogData();

      // Combine all data
      const combinedData = [
        ...newsData,
        ...financialReportsData,
        ...chatLogData,
      ];

      // Summarize the counts for each symbol/company name combination

      const summary = combinedData.reduce(
        (acc, { symbol, companyName, count }) => {
          // Normalize the company name (e.g., remove trailing periods)
          const normalizedCompanyName = companyName
            .trim()
            .replace(/\.$/, '');

          const key = `${symbol}_${normalizedCompanyName}`;
          if (!acc[key]) {
            acc[key] = {
              symbol,
              companyName: normalizedCompanyName,
              count: 0,
            };
          }
          acc[key].count += count;
          return acc;
        },
        {}
      );

      // Convert the summary object to an array of objects
      return Object.values(summary);
    } catch (err) {
      console.error(`Error in findSavedSymbols: ${err}`);
      return { error: err };
    }
  }

  static async deleteNewsDocument(userId, petId) {}
};
