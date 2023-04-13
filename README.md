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

### TEST HARDHAT NODE

```shell
npx hardhat node --port 8700
```

### TEST SERVICE

```shell
ts-node main.ts
```
