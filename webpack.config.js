const path = require("path");

module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === "production" ? "/financial-app/" : "/",
  },
};
