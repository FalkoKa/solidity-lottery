import { useContractRead } from "wagmi";

export const TokenBalance = (props: { balance: string }) => {
  return <p>Your balance: {props.balance}</p>;
};
