const path = require("path");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    path: require.resolve("path-browserify"),
    zlib: require.resolve("browserify-zlib"),
    assert: require.resolve("assert/"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
    util: require.resolve("util/"),
    fs: false,
  };

  return config;
};
