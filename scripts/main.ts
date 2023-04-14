import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

// Extract Provider
const PROVIDER_SIM = "http://127.0.0.1:" + process.env.SIMULATION_PORT!;

// Main function
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_SIM);

  // Get the block number
  const blockNumber = await provider.getBlockNumber();
  console.log("Current block number:", blockNumber);

  // Get the balance of an address
  const address = "0x0d09aEC2D10F396fB59482644708CBd353798b87";
  const balance = await provider.getBalance(address);
  console.log("Balance of address:", ethers.utils.formatEther(balance));
}

// MAIN Entrypoint
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
