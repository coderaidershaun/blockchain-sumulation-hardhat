import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const TX = "0x975ee5e7c427938b74f7a53430ab75af63ad9c096afa0da1109fbc4ee4cc7c8e";

// Extract Provider
const PROVIDER_SIM = "http://127.0.0.1:" + process.env.SIMULATION_PORT!;

async function traceTransaction(txHash: string) {
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_SIM);
  const trace = await provider.send("debug_traceTransaction", [txHash]);
  console.log(trace);
}

// TRACE Transaction Entrypoint
traceTransaction(TX).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
