import type { Signer } from '@ethersproject/abstract-signer'
import type {Provider} from '@ethersproject/abstract-provider'
import { BigNumber, Contract } from 'ethers'
import { contractAddressMap, subManagerAbi, subTokenManagerAbi, subInfoManagerAbi } from './constants'

export type S10nChain = 'Mumbai' | 'Polygon'

interface CreatePlanConf {
    merchantTokenId: number;
    name: string;
    desc: string;
    billingPeriod: number;
    paymentToken: string;
    payeeAddress: string;
    pricePerBillingPeriod: string;
    isSBT: boolean;
    maxTermLength: number;
    canResubscribe: boolean
}


export class S10nSDK {
    private _chain: S10nChain = 'Polygon'
    private _signer: Signer | Provider;
    private _subManagerContract: Contract
    public version = '0.0.7'
    private _subTokenManagerContract: Contract | null = null
    private _subInfoManagerContract: Contract | null = null


    constructor(chain: S10nChain, signer: Signer | Provider) {
        this._chain = chain
        this._signer = signer
        this._subManagerContract = new Contract(contractAddressMap[chain].SubManager, subManagerAbi, signer)
        this.init()
    }

    async init() {
        const subTokenManagerAddress = await this.subTokenManager()
        this._subTokenManagerContract = new Contract(subTokenManagerAddress, subTokenManagerAbi, this._signer)
        const subInfoManagerAddress = await this.subInfoManager()
        this._subInfoManagerContract = new Contract(subInfoManagerAddress, subInfoManagerAbi, this._signer)
    }

    public createSubscription(merchantId: number, planIndex: number) {
        return this._subManagerContract.createSubscription(merchantId, planIndex)
    }

    public createMerchant(name: string) {
        return this._subManagerContract.createMerchant(name)
    }

    public updateMerchant(merchantId: number, name: string) {
        return this._subManagerContract.createMerchant(merchantId, name)
    }

    public createPlan(opt: CreatePlanConf) {
        return this._subManagerContract.createPlan(
            [
                opt.merchantTokenId,
                opt.billingPeriod,
                opt.pricePerBillingPeriod,
                opt.maxTermLength,
                opt.isSBT ? 1 : 0,
                opt.canResubscribe ? 1 : 0
            ],
            [
                opt.paymentToken,
                opt.payeeAddress
            ],
            [
                opt.name,
                opt.desc
            ]
        )
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

    public planManager(): Promise<string> {
        return this._subManagerContract.planManager()
    }

    public subTokenManager(): Promise<string> {
        return this._subManagerContract.subTokenManager()
    }

    public subInfoManager(): Promise<string> {
        return this._subManagerContract.subInfoManager()
    }

    public getMerchantSubscriptionTotal(merchantTokenId: number): Promise<BigNumber> {
        return this._subManagerContract.getMerchantSubscriptionTotal(merchantTokenId)
    }

    public getMerchantPlanSubscriptionTotal(merchantTokenId: number, planIndex: number): Promise<BigNumber> {
        return this._subManagerContract.getMerchantSubscriptionTotal(merchantTokenId, planIndex)
    }

    public chain(): S10nChain {
        return this._chain
    }

    public signer(): Signer | Provider {
        return this._signer
    }

    public getSubscriptionTokenUri(subscriptionTokenId: number): Promise<string> {
        return this._subTokenManagerContract?.tokenURI(subscriptionTokenId)
    }

    public async getSubInfo(subscriptionTokenId: number): Promise<[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,boolean]>{
        if (!this._subInfoManagerContract) {
            await this.init()
        }
        const result = await this._subInfoManagerContract?.getSubInfo(subscriptionTokenId)
        return result
    }

}