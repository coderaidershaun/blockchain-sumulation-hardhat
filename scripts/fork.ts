import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

/**
  Forks the mainnet on a separate port (8700) for then testing transactions against
  Useful for creating a simulated blockchain for testing transactions against in addition
  to being able to call debug_traceTransaction if you want to see why a given transaction failed
*/

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
