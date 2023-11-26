import { useState } from "react";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import * as lotteryTokenAbi from "./assets/abi/LotteryToken.json";
import { ethers } from "ethers";
import { useContractWrite } from "wagmi";

type Props = {
  onUpdate: () => Promise<any>;
  lotteryContractAddress: string;
  lotteryTokenAddress: string;
  address: string;
};

export const BurnToken = ({ onUpdate, lotteryContractAddress, lotteryTokenAddress, address }: Props) => {
  const [formData, setFormData] = useState<{ amount: number | undefined }>({
    amount: undefined,
  });

  const { isLoading: isLoadingLottery, writeAsync: returnTokens } = useContractWrite({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "returnTokens",
    account: address,
  });

  const { isLoading: isLoadingToken, writeAsync: approve } = useContractWrite({
    address: lotteryTokenAddress,
    abi: lotteryTokenAbi.abi,
    functionName: "approve",
    account: address,
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!formData.amount) return;
        approve({ args: [lotteryContractAddress, ethers.MaxUint256] })
          .then(() => {
            if (!formData.amount) throw new Error("Form Data undefined");
            returnTokens({ args: [ethers.parseUnits(formData.amount.toFixed())] });
          })
          .then(async () => {
            await onUpdate();
          })
          .catch(error => {
            console.log(error);
          });
      }}
    >
      <label htmlFor="amount">Burn how many tokens?</label>
      <input
        onChange={e => {
          setFormData({ ...formData, amount: Number(e.currentTarget.value) });
        }}
        name="amount"
        type="number"
        className="input input-bordered w-full  my-2"
        placeholder="1 ETH = 1000 LT0"
      />
      <button
        disabled={isLoadingLottery || isLoadingToken}
        type="submit"
        className="btn btn-active btn-neutral mb-4 w-full"
      >
        Burn Tokens
      </button>
    </form>
  );
};
