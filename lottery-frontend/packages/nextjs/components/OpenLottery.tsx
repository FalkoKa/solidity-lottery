import { useState } from "react";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useBlockNumber, useContractWrite } from "wagmi";

type Props = {
  lastBlockNumber: number | undefined;
  lastBlockTimestamp: number | undefined;
  address: string;
  lotteryContractAddress: string;
  onUpdate: () => Promise<any>;
};

export const OpenLottery = ({
  lastBlockNumber,
  lastBlockTimestamp,
  address,
  lotteryContractAddress,
  onUpdate,
}: Props) => {
  const { isLoading, writeAsync } = useContractWrite({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "openBets",
    account: address,
  });

  const [formData, setFormData] = useState<{ duration: number | undefined }>({ duration: undefined });
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        if (!formData.duration) return;
        if (!lastBlockNumber || !lastBlockTimestamp) return;
        try {
          await writeAsync({ args: [lastBlockTimestamp + formData.duration] });
          const { data } = await onUpdate();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <label htmlFor="amount">The Lottery is currently closed. Open bets for how long?</label>
      <input
        onChange={e => {
          setFormData({ ...formData, duration: Number(e.currentTarget.value) });
        }}
        name="duration"
        type="number"
        className="input input-bordered w-full  my-2"
        placeholder="Duration in seconds"
      />
      <button type="submit" className="btn btn-active btn-neutral mb-4 w-full">
        Open Bets
      </button>
    </form>
  );
};
