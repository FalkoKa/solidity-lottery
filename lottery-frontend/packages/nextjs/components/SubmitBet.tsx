import { useState } from "react";
import { CloseLottery } from "./CloseLottery";
import { Countdown } from "./Countdown";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useContractWrite } from "wagmi";

type Props = {
  lastBlockNumber: number | undefined;
  lastBlockTimestamp: number | undefined;
  address: string;
  lotteryContractAddress: string;
  onUpdate: () => Promise<any>;
};

export const SubmitBet = ({ address, lotteryContractAddress, onUpdate, lastBlockTimestamp }: Props) => {
  const { isLoading, writeAsync } = useContractWrite({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "betMany",
    account: address,
  });

  const [formData, setFormData] = useState<{ amount: number | undefined }>({ amount: undefined });

  return (
    <>
      <Countdown lotteryContractAddress={lotteryContractAddress} />
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (!formData.amount) return;
          try {
            await writeAsync({ args: [formData.amount] });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <label htmlFor="amount">How many times do you want to bet?</label>
        <input
          onChange={e => {
            setFormData({ ...formData, amount: Number(e.currentTarget.value) });
          }}
          name="amount"
          type="number"
          className="input input-bordered w-full  my-2"
        />
        <button disabled={isLoading} type="submit" className="btn btn-active btn-neutral mb-4 w-full">
          Place Bets
        </button>
      </form>
      <CloseLottery lotteryContractAddress={lotteryContractAddress} />
    </>
  );
};
