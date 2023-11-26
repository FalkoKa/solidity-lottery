import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useContractWrite } from "wagmi";

type Props = {
  lotteryContractAddress: string;
};

export const CloseLottery = ({ lotteryContractAddress }: Props) => {
  const { isError, writeAsync: closeLottery } = useContractWrite({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "closeLottery",
  });

  return (
    <>
      {isError && <p>Too early to close the lottery!</p>}
      <button
        onClick={() => {
          closeLottery().catch(error => console.log(error));
        }}
        className="btn btn-active btn-neutral mb-4 w-full"
      >
        close lottery
      </button>
    </>
  );
};
