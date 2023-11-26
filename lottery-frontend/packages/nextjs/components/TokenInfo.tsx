import { BurnToken } from "./BurnToken";
import { BuyToken } from "./BuyToken";
import { TokenBalance } from "./TokenBalance";
import { TokenName } from "./TokenName";
import * as tokenAbi from "./assets/abi/LotteryToken.json";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";

export const TokenInfo = (params: { address: `0x${string}`; tokenAddress: string; lotteryContractAddress: string }) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: params.tokenAddress,
    abi: tokenAbi.abi,
    functionName: "balanceOf",
    args: [params.address],
  });

  if (isLoading) return <div>Fetching token information</div>;
  if (isError) return <div>Error fetching token information</div>;

  return (
    <div className="collapse collapse-arrow bg-primary text-primary-content px-6 py-2">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Lottery Token Shop</div>
      <div className="collapse-content">
        <TokenName tokenAddress={params.tokenAddress} />
        <TokenBalance balance={ethers.formatUnits(data as number)} />
        <div className="flex gap-2">
          <BuyToken
            lotteryContractAddress={params.lotteryContractAddress}
            address={params.address}
            onUpdate={refetch}
          />
          <BurnToken
            lotteryTokenAddress={params.tokenAddress}
            lotteryContractAddress={params.lotteryContractAddress}
            address={params.address}
            onUpdate={refetch}
          />
        </div>
      </div>
    </div>
  );
};
