### UPGRADE NODE

Ensure latest version of node

```shell
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Install yarn

```shell
npm install --global yarn
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
