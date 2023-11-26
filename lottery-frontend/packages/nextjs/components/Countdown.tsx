import { useEffect, useState } from "react";
import * as lotteryAbi from "./assets/abi/Lottery.json";
import { useContractRead } from "wagmi";

type Props = {
  lotteryContractAddress: string;
};

export const Countdown = ({ lotteryContractAddress }: Props) => {
  const { data: closingTime } = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi.abi,
    functionName: "betsClosingTime",
  });

  const [closingTimeDate, setClosingTimeDate] = useState<Date | undefined>();

  const countdownValue = useCountdown(closingTime as number);

  useEffect(() => {
    setClosingTimeDate(new Date(Number(closingTime) * 1000));
  }, []);

  return (
    <div>
      {countdownValue && (
        <p>
          {countdownValue[0]}:{countdownValue[1]}:{countdownValue[2]}:{countdownValue[3]}
        </p>
      )}
      {closingTimeDate ? (
        <p>{`Lottery should close on ${closingTimeDate.toLocaleDateString()} at ${closingTimeDate.toLocaleTimeString()}`}</p>
      ) : (
        <p>"Loading..."</p>
      )}
    </div>
  );
};

function useCountdown(targetDate: number) {
  if (!targetDate) return;
  const countDownDate = new Date(Number(targetDate)).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
}

function getReturnValues(countDown: number) {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
}
