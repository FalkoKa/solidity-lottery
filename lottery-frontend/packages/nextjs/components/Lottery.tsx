import { useEffect, useState } from "react";
import { OpenLottery } from "./OpenLottery";
import { SubmitBet } from "./SubmitBet";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useBlockNumber, useContractRead, usePublicClient } from "wagmi";

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

  const publicClient = usePublicClient();
  const [lastBlockTimestamp, setLastBlockTimestamp] = useState<number | undefined>();
  const [lastBlockNumber, setLastBlockNumber] = useState<number | undefined>();

  async function getLastBlock() {
    const block = await publicClient.getBlock();
    setLastBlockNumber(Number(block.number));
    setLastBlockTimestamp(Number(block.timestamp));
    return;
  }

  useEffect(() => {
    getLastBlock();
  }, [publicClient]);

  console.log("status lottery", betsOpen);

  if (isLoading) return <p>Loading Lottery...</p>;
  if (isError) return <p>There was an error...</p>;

  return (
    <div className="collapse collapse-arrow bg-primary text-primary-content px-6 py-2">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Play</div>
      <div className="collapse-content">
        {betsOpen ? (
          <SubmitBet
            lastBlockNumber={lastBlockNumber}
            lastBlockTimestamp={lastBlockTimestamp}
            address={address}
            lotteryContractAddress={lotteryContractAddress}
            onUpdate={refetch}
          />
        ) : (
          <OpenLottery
            lastBlockNumber={Number(lastBlockNumber)}
            address={address}
            lotteryContractAddress={lotteryContractAddress}
            onUpdate={refetch}
            lastBlockTimestamp={lastBlockTimestamp}
          />
        )}
      </div>
    </div>
  );
};
