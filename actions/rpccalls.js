"use server"

import sol from "@solana/web3.js";
import axios from "axios";

export async function getBalance(pubKey) {
    const rpcUrl = "https://solana-mainnet.g.alchemy.com/v2/SAYlQwufimmQh7gGhy9SBFRX665gaTz5";
    let request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": [pubKey]
    }
    try {
        const response = await axios.post(rpcUrl, request);
        const value = response.data.result.value;
        return value;
    } catch (error) {
        console.log("error while fetching balance", error);
    }
}