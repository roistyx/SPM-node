const sendErrorResponse = (res, message) => {
  console.log('Error logged on helpers/sendErrorResponse:', message);
  return res.status(200).json({ warning_message: message });
};

module.exports = { sendErrorResponse };
