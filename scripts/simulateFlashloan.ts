import { ethers } from "hardhat";
import { abi as abiSimulateFlash } from "../abis/flashloanSimulation.json";
import dotenv from "dotenv";
import * as fs from 'fs/promises';
dotenv.config();

/**
  Run a flashloan simulation on a forked mainnet to ascertain
  profitability
*/

interface Trade {
  amounts_borrow: string[],
  exch_route: string[],
  v3_fee: number,
  swap_route: string[],
  tokens_borrow: string[],
}

// Function to simulate a flashloan
async function flashloanSimulation() {

  // Get signer
  const [signer] = await ethers.getSigners();
  const jsonString = await fs.readFile('/home/ubuntu/code/simulator/scripts/simulation_obj.txt', 'utf8');

  const trade: Trade = JSON.parse(jsonString);

  console.log(trade); // Print the parsed JSON object

  // // FOR DEBUGGING
  // const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  // const fromAddr = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
  // const toAddr = "0x6b175474e89094c44da98b954eedeac495271d0f";
  // const amountBorrow = ethers.utils.parseUnits("0.1", 18); // WETH
  // const tokensBorrow = [WETH];
  // const amountsBorrow = [amountBorrow];
  // const swapRoute = [fromAddr, toAddr];
  // const exchRoute = [0, 1, 0]; // [0] = Uniswap V2, [1] = Uniswap V3
  // const feeV3 = 500; // 100, 500, 3000 or 10000

  /*
    Call simulation contract:
      Note simulation address for contract from flashloans file created and saved on git
      Simulates a flashloan on Balancer swapping on UniswapV2 and UniswapV3
      ABI available in abis folder for checking inputs
  */

  // Create and call contract
  const contractSimFlash = new ethers.Contract("0x241102844A2AeB78Affe9d62fdB36260e7bACCA0", abiSimulateFlash, signer);
  const txSimFlash = await contractSimFlash.simulateFlashLoan(
    trade.tokens_borrow, 
    trade.amounts_borrow, 
    trade.swap_route, 
    trade.exch_route, 
    trade.v3_fee
  );
  const txReceipt = await txSimFlash.wait();

  // Create interface to decode transaction logs
  const FlashLoanSimulatedInterface = new ethers.utils.Interface(["event FlashLoanSimulated(uint256 gasUsed, uint256 tokenProfit)"]);

  // Create interface and object for returning results
  interface FlashSimResults { gasUsed: string; tokenProfit: string; }
  let flashsimResults: FlashSimResults =  { gasUsed: "", tokenProfit: "" }

  // Decode the smart contract events
  if (txReceipt.status == 1) {
    for (let i = 0; i < txReceipt.logs.length; i++) {
      const log = txReceipt.logs[i];
  
      // Try to decode the log using the FlashLoanSimulated event signature
      try {
          const decodedLog = FlashLoanSimulatedInterface.parseLog(log);
          const gasUsed = decodedLog.args.gasUsed.toString();
          const tokenProfit = decodedLog.args.tokenProfit.toString();
          flashsimResults.gasUsed = gasUsed;
          flashsimResults.tokenProfit = tokenProfit;
      } catch (e) {
          // console.log(e);
      }
    }
  }

  console.log(JSON.stringify(flashsimResults));
} 

// FORK Mainnet Node Entrypoint
flashloanSimulation().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
