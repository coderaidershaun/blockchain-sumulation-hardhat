import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

/**
 * Run as: npx hardhat node --port 8700
 * This is because GETH is already listening on 8545
 */

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18", // Replace with your desired Solidity compiler version
  },
  // defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.PROVIDER_URL!,
      },
    },
  },
};

export default config;
