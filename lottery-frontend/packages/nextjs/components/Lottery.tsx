import { useState } from "react";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useContractRead } from "wagmi";

type Props = {
  address: string;
  lotteryContractAddress: string;
};

export const Lottery = ({ address, lotteryContractAddress }: Props) => {
  const {
    data: betsOpen,
    isLoading,
    isError,
    refetch,
  } = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "betsOpen",
  });

  console.log(betsOpen);
  return (
    <div className="collapse collapse-arrow bg-primary text-primary-content px-6 py-2">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Play</div>
      <div className="collapse-content">{betsOpen ? <>bet</> : <>open lottery</>}</div>
    </div>
  );
};
