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

  static async createFinancialReportEntry(reportData) {
    const response = await financialReports.insertOne({
      ...reportData,
    });
    console.log('Saved', response);
    return;
  }

  static async getFinancialReportList(symbol) {
    try {
      const query = { 'report.symbol': symbol };
      const documents = await financialReports.find(query).toArray();

      console.log('Matching documents', documents);
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

  static async adminInit() {
    let isAdminInit = '';
    console.log('Hello world');
    const user = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // isAdminInit = await this.getUserByUsername(user);
    console.log('isAdminInit', isAdminInit);
    // if (isAdminInit) return;

    const userData = {
      username: user,
      password: password,
      role: 'admin',
      created_at: new Date(),
      login_attempts: 0,
    };
    console.log('Admin created', userData);
    return await newsCollection.insertOne({ ...userData });
  }

  static async getUserByUsername(username) {
    const userObject = await newsCollection.findOne({ username });
    // console.log('userObject', userObject);
    return userObject;
  }

  static async updateUserById(UserId, userData) {
    try {
      const updateResponse = await newsCollection.updateOne(
        { _id: new ObjectId(UserId) },
        { $set: { ...userData } }
      );
      return updateResponse;
    } catch (err) {
      console.log('Error in updateUserById: ', err);
      return { error: err };
    }
  }

  static async savePet(userId, petId) {
    // console.log('userId', userId);
    // console.log('petId', petId);
    try {
      // const updateResponse = await userCollection.updateOne(
      // 	{ _id: new ObjectId(userId) },
      // 	{ $push: { pets: petId } }
      // );
      const result = await newsCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $push: { pets: petId } },
        { returnOriginal: false }
      );
      const pets = await this.getUserById(new ObjectId(userId));
      console.log('Original result?', result);

      return pets;
    } catch (err) {
      console.log('Error in savePet: ', err);
      return { error: err };
    }
  }

  static async updateUserById(UserId, userData) {
    try {
      const updateResponse = await newsCollection.updateOne(
        { _id: new ObjectId(UserId) },
        { $set: { ...userData } }
      );
      return updateResponse;
    } catch (err) {
      console.log('Error in updateUserById: ', err);
      return { error: err };
    }
  }

  static async deletePet(userId, petId) {
    console.log('userId', userId);
    console.log('petId', petId);
    try {
      // const updateResponse = await userCollection.updateOne(
      // 	{ _id: new ObjectId(userId) },
      // 	{ $push: { pets: petId } }
      // );
      const result = await newsCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $pull: { pets: petId } },
        { returnOriginal: false }
      );
      // return console.log('result', result.value.pets);
      return result.value.pets;
      return updateResponse;
    } catch (err) {
      console.log('Error in savePet: ', err);
      return { error: err };
    }
  }

  static async getPetSavedList(userId, petId) {
    console.log('userId', userId);
    console.log('petId', petId);
    try {
    } catch (err) {
      console.log('Error in savePet: ', err);
      return { error: err };
    }
  }

  static async unSavePets(userId, petId) {
    console.log('userId', userId);
    console.log('petId', petId);
    try {
      const isExist = await newsCollection.findOne({
        _id: new ObjectId(userId),
        pets: petId,
      });
      if (!isExist) return console.log('Nothing to unsave');
      const updatedPetList = await newsCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $pull: { pets: petId } },
        { returnOriginal: false }
      );
      console.log('updatedPetList', updatedPetList);
      return updatedPetList;
    } catch (err) {
      console.log('Error in deleteSavedPet: ', err);
      return { error: err };
    }
  }
};
