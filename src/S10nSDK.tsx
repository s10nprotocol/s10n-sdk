import type { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { contractAddressMap, subManagerAbi } from './constants'

export type S10nChain = 'Mumbai' | 'Polygon'


export class S10nSDK {
    private _chain: S10nChain = 'Polygon'
    private _signer: Signer;
    private _subManagerContract: Contract


    constructor(chain: S10nChain, signer: Signer) {
        this._chain = chain
        this._signer = signer
        this._subManagerContract = new Contract(contractAddressMap[chain].SubManager, subManagerAbi, signer)
    }

    public createSubscription(merchantId: number, planIndex: number) {
        return this._subManagerContract.createSubscription(merchantId, planIndex)
    }

    
    public chain() : S10nChain {
        return this._chain
    }

    public signer() : Signer {
        return this._signer
    }
}