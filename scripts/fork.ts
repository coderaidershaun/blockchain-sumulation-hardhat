import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

// Extract Provider
const PORT = process.env.SIMULATION_PORT!;
const PROVIDER_SIM = "http://127.0.0.1:" + PORT;

// Function to simulate latest mainnet node
async function forkMainnet() {
  console.log(`Forked mainnet node at ${PROVIDER_SIM}`);

  // Execute running hardhat node
  exec(`npx hardhat node --port ${PORT}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
}

// FORK Mainnet Node Entrypoint
forkMainnet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
