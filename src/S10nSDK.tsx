import type { Signer } from '@ethersproject/abstract-signer'
import { Contract } from 'ethers'
import { contractAddressMap, subManagerAbi } from './constants'

export type S10nChain = 'Mumbai' | 'Polygon'


export class S10nSDK {
    private _chain: S10nChain = 'Polygon'
    private _signer: Signer;
    private _subManagerContract: Contract
    // private _planManagerContract: Contract | null = null


    constructor(chain: S10nChain, signer: Signer) {
        this._chain = chain
        this._signer = signer
        this._subManagerContract = new Contract(contractAddressMap[chain].SubManager, subManagerAbi, signer)
        // this.init()

    }

    // async init() {
        // const planManager = await this._subManagerContract.planManager()
        // this._planManagerContract = new Contract(planManager, planManagerAbi, this._signer)
    // }

    public createSubscription(merchantId: number, planIndex: number) {
        return this._subManagerContract.createSubscription(merchantId, planIndex)
    }

    public createMerchant(name: string) {
        return this._subManagerContract.createMerchant(name)
    }

    public updateMerchant(merchantId: number, name: string) {
        return this._subManagerContract.createMerchant(merchantId, name)
    }

    public createPlan(opt: { merchantTokenId: number; name: string; desc: string; billingPeriod: number; paymentToken: string; payeeAddress: string; pricePerBillingPeriod: string; isSBT: boolean; maxTermLength: number; canResubscribe: boolean }) {
        console.log('start create plan')
        return this._subManagerContract.createPlan([opt.merchantTokenId, opt.billingPeriod, opt.pricePerBillingPeriod, opt.maxTermLength, opt.isSBT ? 1 : 0, opt.canResubscribe ? 1 : 0], [opt.paymentToken, opt.payeeAddress], [opt.name, opt.desc])
    }

    public charge(subscriptionTokenId: number) {
        return this._subManagerContract.charge(subscriptionTokenId)
    }

    public cancelSubscription(subscriptionTokenId: number) {
        return this._subManagerContract.cancelSubscription(subscriptionTokenId)
    }

    public disablePlan(merchantTokenId: number, planIndex: number) {
        return this._subManagerContract.disablePlan(merchantTokenId, planIndex)
    }

    public chain(): S10nChain {
        return this._chain
    }

    public signer(): Signer {
        return this._signer
    }
}