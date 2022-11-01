require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  URI_MONGODB: process.env.URI_DB,
};
