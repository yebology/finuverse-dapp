import idl from "../idl/DeployedContract.json";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const commitmentLevel = "confirmed";
export const endpoint = clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);

export const programId = new PublicKey(idl.metadata.address);
export const programInterface = JSON.parse(JSON.stringify(idl));