"use client"
import Seed from "@/components/seedPhrase";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateMnemonic } from "bip39";
import { mnemonicToSeedSync } from "bip39";
import { useEffect } from "react";

import Image from "next/image";
import bip from "bip39";
import Wallet from "@/components/wallet";

export default function Home() {
  const[phrase, setPhrase] = useState("");
  const [accounts, setAccounts] = useState([]);

  
      const getPhrase = () =>{
          const mnemonic = generateMnemonic();
          const seed = mnemonicToSeedSync(mnemonic);
          console.log(seed);
          setPhrase(mnemonic);
  
      }
      const handleClick = ()=> {
        getPhrase();
      }
      const newKeypair = ()=> {
        setAccounts((arr)=>[...arr, {}] )
      }

  return (
    <div>
      <div className="h-16 m-2 p-10 border border-black flex items-center">
        <h1>Web3 Wallet Visualizer</h1>
      </div>
      <div className="h-16 flex justify-between items-center m-2 p-10 border border-black">
        {phrase==="" ? <Button onClick={handleClick} >Create New Wallet</Button>  : <h3>Create New Wallet</h3>}
        <Button onClick={newKeypair}>Generate Keypair</Button>
      </div>
      <div className="m-2 border border-black">
        <Seed phrase={phrase} />
      </div>
      <div>
        {accounts.map((_, index)=> {
          return <Wallet key={index} phrase={phrase} index={index}/>
        })}
      </div>
    </div>
  )
}
