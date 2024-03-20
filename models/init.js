// const { MongoClient } = require("mongodb");
// const FinancialsDao = require("./FinancialsDao");
// const StockNewsDAO = require("./StockNewsDao");

// module.exports.InitDB = async function initDB() {
//   MongoClient.connect(process.env.MONGODB_URI)

//     .then(async (connection) => {
//       await StockNewsDAO.injectDB(connection.db(process.env.DB));
//       await FinancialsDao.injectDB(connection.db(process.env.DB));
//     })
//     .catch((err) => {
//       console.log("error connecting to MongoDB:", err);
//       process.exit(1);
//     });
// };
