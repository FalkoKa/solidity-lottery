import { ethers } from 'ethers';
import { LotteryToken, LotteryToken__factory } from '../typechain-types';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ''
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);

  const tokenAddress = '0xbB95a0C7E5B6EbFF856d8E9F6AF553379d85c4eD';

  const tokenFactory = new LotteryToken__factory(wallet);

  const tokenContract = tokenFactory.attach(tokenAddress) as LotteryToken;

  try {
    const balance = await tokenContract.balanceOf(
      '0xBAF5cdEAD710e3347Dc3862E38a4044EAc50A036'
    );
    console.log(ethers.formatUnits(balance));
  } catch (error: any) {
    console.log(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
