import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { Lottery__factory } from '../typechain-types';
dotenv.config();

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1000n;

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ''
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);
  const lotteryContractFactory = new Lottery__factory(wallet);
  const lotteryContract = await lotteryContractFactory.deploy(
    'LotteryToken',
    'LT0',
    TOKEN_RATIO,
    ethers.parseUnits(BET_PRICE.toFixed(18)),
    ethers.parseUnits(BET_FEE.toFixed(18))
  );
  await lotteryContract.waitForDeployment();

  const lotteryContractAddress = lotteryContract.target;
  const lotteryTokenAddress = await lotteryContract.paymentToken();

  console.log(`Lottery Contract deployed to ${lotteryContractAddress}`);
  console.log(`Address of Lottery Token is ${lotteryTokenAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Lottery Contract deployed to 0x9808AB3B83f41a9D10e04e6c08EA5b7E4258d12d
// Address of Lottery Token is 0xbB95a0C7E5B6EbFF856d8E9F6AF553379d85c4eD
