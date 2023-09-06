# Avalanche Network - Subnet

### Installation
```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-network-runner/main/scripts/install.sh | sh -s
```

### Extend Path
```bash
export PATH=~/Projects/avalanche-test/bin:$PATH
```

### Run Avalanche Server
```bash
avalanche-network-runner server
avalanche-network-runner control start
```

### Test
```bash
curl -X POST -k http://localhost:8081/v1/ping
```

##  CLI
```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

### Extend Path
```bash
export PATH=~/Projects/avalanche-test/bin:$PATH
```

### Create Subnet
```bash
avalanche subnet create <name>
avalanche subnet deploy <name>
avalanche network stop
avalanche network start
```

Example:
toor@toor:~/Projects/avalanche-test/bin$ ./avalanche subnet deploy defihq
✔ Local Network
Deploying [defihq] to Local Network
Installing subnet-evm-v0.5.5...
subnet-evm-v0.5.5 installation successful
Backend controller started, pid: 6702, output at: /home/toor/.avalanche-cli/runs/server_20230905_140719/avalanche-cli-backend.log
Installing avalanchego-v1.10.9...
avalanchego-v1.10.9 installation successful

Booting Network. Wait until healthy...
Node logs directory: /home/toor/.avalanche-cli/runs/network_20230905_140721/node<i>/logs
Network ready to use.

Deploying Blockchain. Wait until network acknowledges...

Blockchain ready to use. Local network node endpoints:
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| NODE  |   VM   |                                         URL                                         |                ALIAS URL                |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| node1 | defihq | http://127.0.0.1:9650/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc | http://127.0.0.1:9650/ext/bc/defihq/rpc |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| node2 | defihq | http://127.0.0.1:9652/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc | http://127.0.0.1:9652/ext/bc/defihq/rpc |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| node3 | defihq | http://127.0.0.1:9654/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc | http://127.0.0.1:9654/ext/bc/defihq/rpc |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| node4 | defihq | http://127.0.0.1:9656/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc | http://127.0.0.1:9656/ext/bc/defihq/rpc |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+
| node5 | defihq | http://127.0.0.1:9658/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc | http://127.0.0.1:9658/ext/bc/defihq/rpc |
+-------+--------+-------------------------------------------------------------------------------------+-----------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/2tkbDkDkw85m6PXtWY7zzwNxiQ7EznJX1iMgnL5GbxJFzyHwBv/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     defihq
Chain ID:         1078
Currency Symbol:  DHQ

wget https://nodejs.org/dist/v18.17.1/node-v18.17.1-linux-x64.tar.xz
tar -xvf node-v18.17.1-linux-x64.tar.xz node-v18.17.1-linux-x64/
mv node-v18.17.1-linux-x64/ node
sudo mv node/ /opt/
npm install -g truffle
npm install web3 avalanche -s
truffle init
npm install @truffle/hdwallet-provider
cd contracts/
vi Storage.sol

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}

cd migrations/
vi 2_deploy_contracts.js
vi truffle-config.js

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

truffle compile
truffle console --network defihq

toor@toor:~/Projects/avalanche-test/truffle$ truffle compile

Compiling your contracts...
===========================
✓ Fetching solc version list from solc-bin. Attempt #1
✓ Downloading compiler. Attempt #1.
> Everything is up to date, there is nothing to compile.
toor@toor:~/Projects/avalanche-test/truffle$ truffle compile

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
toor@toor:~/Projects/avalanche-test/truffle$ truffle console --network defihq
truffle(defihq)> accounts
[ '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC' ]
truffle(defihq)> await web3.eth.getBalance(accounts[0])
'1000000000000000000000000'
truffle(defihq)> migrate --network defihq

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'defihq'
> Network id:      1078
> Block gas limit: 8000000 (0x7a1200)


2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > transaction hash:    0x3ee25ba4d899f5877dbf6770b1fe6b16a50028f8a433762b3f2562d867197e84
   > Blocks: 0            Seconds: 0
   > contract address:    0x52C84043CD9c865236f11d9Fc9F56aa003c1f922
   > block number:        1
   > block timestamp:     1694038235
   > account:             0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
   > balance:             999999.9966172525
   > gas used:            123009 (0x1e081)
   > gas price:           27.5 gwei
   > value sent:          0 ETH
   > total cost:          0.0033827475 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0033827475 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0033827475 ETH

truffle(defihq)> let instance = await Storage.deployed()
undefined
truffle(defihq)> instance.store(1234)
{
  tx: '0x97dc55b34de6192b594843399d6f82932b5ef4a03742755757ea59577bf3c7a2',
  receipt: {
    blockHash: '0xccc4d9e2249cdb83b2ce4462b9e65e47cd32817d3f4daa534b0129831c45b2a9',
    blockNumber: 2,
    contractAddress: null,
    cumulativeGasUsed: 43730,
    effectiveGasPrice: 27500000000,
    from: '0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc',
    gasUsed: 43730,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x52c84043cd9c865236f11d9fc9f56aa003c1f922',
    transactionHash: '0x97dc55b34de6192b594843399d6f82932b5ef4a03742755757ea59577bf3c7a2',
    transactionIndex: 0,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(defihq)> i.toNumber()
Uncaught ReferenceError: i is not defined
truffle(defihq)> let i = await instance.retrieve()
undefined
truffle(defihq)> i.toNumber()
1234
truffle(defihq)> 