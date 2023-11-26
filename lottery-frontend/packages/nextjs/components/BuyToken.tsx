import { useState } from "react";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { ethers } from "ethers";
import { useContractWrite } from "wagmi";

type Props = {
  onUpdate: () => Promise<any>;
  lotteryContractAddress: string;
  address: string;
};

export const BuyToken = ({ onUpdate, lotteryContractAddress, address }: Props) => {
  const [formData, setFormData] = useState<{ amount: number | undefined }>({
    amount: undefined,
  });

  const { isLoading, writeAsync, write } = useContractWrite({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "purchaseTokens",
    account: address,
    value: undefined,
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!formData.amount) return;
        writeAsync({ value: ethers.parseUnits(formData.amount.toFixed(18)) / 1000n })
          .then(async () => {
            await onUpdate();
          })
          .catch(error => console.log(error));
      }}
    >
      <label htmlFor="amount">Buy how many tokens?</label>
      <input
        onChange={e => {
          setFormData({ ...formData, amount: Number(e.currentTarget.value) });
        }}
        name="amount"
        type="number"
        className="input input-bordered w-full  my-2"
        placeholder="1 ETH = 1000 LT0"
      />
      <button disabled={isLoading} type="submit" className="btn btn-active btn-neutral mb-4 w-full">
        Buy Tokens
      </button>
    </form>
  );
};
