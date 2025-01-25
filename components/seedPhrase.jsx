"use client"

import React, { useEffect, useState } from 'react'
import {generateMnemonic, mnemonicToSeedSync} from "bip39";
import { Card,CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from './ui/card';

const Seed = ({phrase}) => {

    return (
        <div className=''>
        <Card className="items-center">
            <CardContent className=" h-20 flex justify-center items-center" >
                <p className=' flex justify-center'>{phrase}</p>
            </CardContent>
        </Card>
        </div>
      
    )
}

export default Seed