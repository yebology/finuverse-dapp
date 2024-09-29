import { AnchorProvider } from "@coral-xyz/anchor";
import { commitmentLevel, connection } from "./constant";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export function getProvider(wallet: AnchorWallet) {
  if (!wallet) {
    console.log("Wallet not connected!");
    return;
  }
  return new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
}

export function getProviderWithoutLogin() {
  return new AnchorProvider(connection, {} as any, {
    preflightCommitment: "recent",
  });
}


export function truncate(
  text: string,
  startChar: number,
  endChar: number,
  maxLength: number
) {
  if (text.length > maxLength) {
    let start = text.substring(0, startChar);
    let end = text.substring(text.length - endChar, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
}