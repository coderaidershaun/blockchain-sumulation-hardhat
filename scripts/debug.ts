import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

/**
  Listens to main live blockchain and calls debug_traceTransaction
  Used to test connectivity to Geth node 8545
*/

// Extract Provider
const PORT = process.env.SIMULATION_PORT!;
const PROVIDER_SIM = "http://127.0.0.1:8545";

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

  // Debug a recent transaction
  const block = await provider.getBlockWithTransactions(blockNumber);
  if (block.transactions.length > 0) {

    const recentTransaction = block.transactions[0];

    // Trace transaction
    const trace = await provider.send("debug_traceTransaction", [
      recentTransaction.hash,
    ]);

    // // Now get the debug_traceTransaction
    // const trace = await axios.post('http://127.0.0.1:8700', {
    //   jsonrpc: '2.0',
    //   id: 1,
    //   method: 'debug_traceTransaction',
    //   params: [txReceipt.transactionHash],
    // });

    console.log("trace");
  }
}

// MAIN Entrypoint
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
