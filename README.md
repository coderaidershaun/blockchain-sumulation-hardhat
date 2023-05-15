### UPGRADE NODE

Ensure latest version of node

```shell
sudo apt install nodejs
sudo apt install npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Install yarn

```shell
npm install --global yarn
```

### CLONE REPO

```shell
git clone https://github.com/coderaidershaun/blockchain-sumulation-hardhat.git simulator
```

### CHANGE DIR

```shell
cd simulator
```

### INSTALL PACKAGES

```shell
yarn --exact
```

### UPDATE .env

```shell
yarn --exact
```

```env
PROVIDER_URL=http://127.0.0.1:8545
SIMULATION_PORT=8700
```

### FORK MAINNET NODE

```shell
npx hardhat run scripts/fork.ts
```

or run the following if you want to see addresses etc.

```shell
npx hardhat node --port 8700
```

### TEST YOUR NODE CAN DEBUG TRANSACTIONS

Get a recent transaction hash from etherscan. Insert it below and try the following curl method.

Important, replace the TX Hash below with a recent one that was synced on your node.

curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0xd4bfa516f9f1902adad7fb3d008ea579c2a4b0d86f012a68cb4295881e125248"],"id":1}' http://localhost:8545
