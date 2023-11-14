const axios = require("axios");

const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;

async function getStockData(req, res) {
  const symbol = req.params.symbol;
  console.log("symbol", symbol);
  try {
    const endpoint = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1d&apikey=${TWELVE_DATA_API_KEY}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}
