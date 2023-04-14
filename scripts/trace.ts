import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

// curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0x07a37dd999ab9791bcb0ff04fa3b29cd22487fa2a51a773e17e2ffbfef889505"],"id":1}' http://localhost:8545

// Extract Provider
const PROVIDER_SIM = "http://127.0.0.1:" + process.env.SIMULATION_PORT!;

// Debug Simulation
async function debugSimulation() {
  // Get the first signer
  const [signer] = await ethers.getSigners();

  // Send a transaction
  const toAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Replace with the recipient's address
  const value = ethers.utils.parseEther("0.01"); // 0.01 Ether

  const tx = {
    to: toAddress,
    value: value,
  };

  const transactionResponse = await signer.sendTransaction(tx);
  console.log("Transaction sent:", transactionResponse.hash);

  // Wait for the transaction to be mined
  const txReceipt = await transactionResponse.wait();
  console.log("Transaction mined:", txReceipt.transactionHash);

  // Get provider
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_SIM);

  // Trace transaction
  const trace = await provider.send("debug_traceTransaction", [
    txReceipt.transactionHash,
  ]);

  console.log("DEBUG TRACE");
  console.log(trace);
}

// SIMULATION Entrypoint
debugSimulation().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
