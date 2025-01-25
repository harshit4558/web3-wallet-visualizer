import React, { useEffect, useState } from 'react'
import { Card,CardHeader,CardTitle,CardContent } from './ui/card'
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl";
import {Keypair} from "@solana/web3.js";

const Wallet = ({phrase, index}) => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  useEffect(()=> {
    if(phrase){
      console.log(phrase);
      addKeyPair(phrase, index);
    }
  },[phrase])
  
  const addKeyPair = (phrase, index)=> {
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, phrase.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setPublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setPrivateKey(Buffer.from(secret.slice(0,32)).toString("hex"));
  }



  return (
    <div>
      <Card>
        <CardHeader>
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
    </Card>

    </div>
  )
}

export default Wallet