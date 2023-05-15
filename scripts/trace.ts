import { ethers } from "hardhat";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();


/*
  Useful for debugging a transaction sent to the forked mainnet on port 8700.
  Must ensure simulated blockchain is running before executing this.
*/


// Extract Provider
const PORT = process.env.SIMULATION_PORT!;
const PROVIDER_SIM = "http://127.0.0.1:" + PORT;

// Debug Simulation
async function debugSimulation() {
  const [signer] = await ethers.getSigners();
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_SIM);

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

  // Now get the debug_traceTransaction
  const trace = await axios.post('http://127.0.0.1:8700', {
    jsonrpc: '2.0',
    id: 1,
    method: 'debug_traceTransaction',
    params: [txReceipt.transactionHash],
  });

  console.log(trace);

  // // Trace transaction
  // const trace = await provider.send("debug_traceTransaction", [
  //   txReceipt.transactionHash,
  // ]);

  console.log("DEBUG TRACE");
  // console.log(trace);
}

// SIMULATION Entrypoint
debugSimulation().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
