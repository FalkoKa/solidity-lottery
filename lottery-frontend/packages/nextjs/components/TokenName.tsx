import * as tokenAbi from "./assets/abi/LotteryToken.json";
import { useContractRead } from "wagmi";

export const TokenName = (params: { tokenAddress: string }) => {
  const { data, isError, isLoading } = useContractRead({
    address: params.tokenAddress,
    abi: tokenAbi.abi,
    functionName: "name",
  });
  const { data: symbol } = useContractRead({
    address: params.tokenAddress,
    abi: tokenAbi.abi,
    functionName: "symbol",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return (
    <>
      <p>Token name: {name}</p>
      <p>Token Symbol: {symbol as string}</p>
    </>
  );
};
