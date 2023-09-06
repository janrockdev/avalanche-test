const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey = "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027";
const privateKeyProvider = new PrivateKeyProvider(privateKey, "http://127.0.0.1:9650/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc");
module.exports = {
  networks: {
    defihq: {
      network_id: "1078",
      provider: privateKeyProvider
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.14"
    }
  }
};
