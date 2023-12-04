const { de } = require('date-fns/locale');

const sendErrorResponse = (res, errorCode, message) => {
  console.log('Error logged on helpers/sendErrorResponse:', message);

  switch (errorCode) {
    case 200:
      return res.status(200).json({
        error: true,
        warning_message: message,
      });

    case 500:
      return res.status(500).json({
        error: true,
        warning_message: message,
      });
    default:
      return res.status(500).json({
        error: true,
      });
  }
};

module.exports = { sendErrorResponse };
