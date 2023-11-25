import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { TokenInfo } from "~~/components/TokenInfo";
import { WalletInfo } from "~~/components/WalletInfo";

export const lotteryContractAddress = "0x9808AB3B83f41a9D10e04e6c08EA5b7E4258d12d";
export const lotteryTokenAddress = "0xbB95a0C7E5B6EbFF856d8E9F6AF553379d85c4eD";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-6">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Group 8's Ballot Contract Frontend</span>
          </h1>
        </div>
        {isDisconnected && <div>Wallet disconnected. Connect wallet to continue</div>}
        {!isConnecting ? (
          <div className="grid gap-3">
            {address && chain && <WalletInfo address={address as `0x${string}`} chain={chain} />}
            {address && <TokenInfo address={address as `0x${string}`} tokenAddress={lotteryTokenAddress} />}
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
