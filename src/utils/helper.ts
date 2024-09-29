import { AnchorProvider } from "@coral-xyz/anchor";
import { commitmentLevel, connection } from "./constant";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export function getProvider(wallet: AnchorWallet) {
    if (!wallet) {
        console.log("Wallet not connected!");
        return;
    }
    return new AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel
    });
};