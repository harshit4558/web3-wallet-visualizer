import React, { useEffect, useState } from 'react'
import { Card,CardHeader,CardTitle,CardContent } from './ui/card'
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl";
import * as  ethers from "ethers";
import {Keypair} from "@solana/web3.js";
import { Button } from './ui/button';
import { getBalance } from '@/actions/rpccalls';

const Wallet = ({phrase, index, token}) => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("");
  

  useEffect(()=> {
    {token == "ETH" && phrase 
      ? addKeyPairEth(phrase, index)
      : addKeyPairSol(phrase, index)  
    }
    
  },[phrase])
  
  const addKeyPairSol = (phrase, index)=> {
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, phrase.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setPublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setPrivateKey(Buffer.from(secret.slice(0,32)).toString("hex"));
  }
  const addKeyPairEth = (phrase, index) => {
    
    const path = `m/44'/60'/${index}'/0'`
    const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, path);
    setPrivateKey(wallet.privateKey);
    setPublicKey(wallet.address);
  }
  const getWalletBalance = ()=> {
    if(token =="SOL"){
      const value = getBalance(publicKey);
      setBalance(value);
    }
  }



  return (
    <div className='border border-black rounded-xl'>
      <Card>
        <CardHeader >
          {token == "ETH" 
            ? <CardTitle>ETH Wallet</CardTitle>
            : <CardTitle>SOL Wallet</CardTitle>
          }
          <CardTitle>Public Key</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{publicKey}</p>
        </CardContent>
        <CardHeader>
          <CardTitle>Private Key</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{privateKey}</p>
        </CardContent>
        <div className='flex items-center'>
        <CardContent>
          <Button onClick={getWalletBalance}>Get Balance</Button>
        </CardContent>
        {balance ==="" 
          ? <></>
          : <CardContent>
            <p>{balance} SOL</p>
            </CardContent>
        }
        </div>
    </Card>

    </div>
  )
}

export default Wallet