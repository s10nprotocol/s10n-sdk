import type { Signer } from '@ethersproject/abstract-signer';
import type { Provider } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import {
  subManagerAbi,
  subTokenManagerAbi,
  subInfoManagerAbi,
  merchantTokenManagerAbi,
  planManagerAbi,
} from './constants';

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
  canResubscribe: boolean;
}

export class S10nSDK {
  private _signer: Signer | Provider;
  public _subManagerContract: Contract;
  public merchantTokenManager: string | null = null;
  public subscriptionTokenManager: string | null = null;
  private _subTokenManagerContract: Contract | null = null;
  private _subInfoManagerContract: Contract | null = null;
  private _merchantTokenManager: Contract | null = null;
  private _planManger: Contract | null = null;

  constructor(contract: string, signer: Signer | Provider) {
    this._signer = signer;
    this._subManagerContract = new Contract(contract, subManagerAbi, signer);
  }

  async initSubTokenManager() {
    const subTokenManagerAddress = await this.subTokenManager();
    this.subscriptionTokenManager = subTokenManagerAddress;
    this._subTokenManagerContract = new Contract(
      subTokenManagerAddress,
      subTokenManagerAbi,
      this._signer
    );
  }

  async initSubInfoManager() {
    const subInfoManagerAddress = await this.subInfoManager();
    this._subInfoManagerContract = new Contract(
      subInfoManagerAddress,
      subInfoManagerAbi,
      this._signer
    );
  }

  async initMerchantManager() {
    const merchantManager = await this.merchantManager();
    this.merchantTokenManager = merchantManager;
    this._merchantTokenManager = new Contract(
      merchantManager,
      merchantTokenManagerAbi,
      this._signer
    );
  }

  async initPlanManger() {
    const planManagerAddress = await this.planManager();
    this._planManger = new Contract(
      planManagerAddress,
      planManagerAbi,
      this._signer
    );
  }

  async init() {
    await this.initSubTokenManager();
    await this.initSubInfoManager();
    await this.initMerchantManager();
  }

  public merchantManager(): Promise<string> {
    return this._subManagerContract.merchantTokenManager();
  }

  public createMerchant(name: string, isSBT: boolean) {
    return this._subManagerContract.createMerchant(name, isSBT);
  }

  public createMerchantEstimateGas(name: string, isSBT: boolean) {
    return this._subManagerContract.estimateGas.createMerchant(name, isSBT);
  }

  public updateMerchant(merchantId: number, name: string) {
    return this._subManagerContract.createMerchant(merchantId, name);
  }

  public createPlan(opt: CreatePlanConf) {
    return this._subManagerContract.createPlan(
      [
        opt.merchantTokenId,
        opt.billingPeriod,
        opt.pricePerBillingPeriod,
        opt.maxTermLength,
        opt.isSBT ? 1 : 0,
        opt.canResubscribe ? 1 : 0,
      ],
      [opt.paymentToken, opt.payeeAddress],
      [opt.name, opt.desc]
    );
  }

  public disablePlan(merchantTokenId: number, planIndex: number) {
    return this._subManagerContract.disablePlan(merchantTokenId, planIndex);
  }

  public enablePlan(merchantTokenId: number, planIndex: number) {
    return this._subManagerContract.enablePlan(merchantTokenId, planIndex);
  }

  public updatePlan(
    merchantTokenId: number,
    planIndex: number,
    name: string,
    description: string,
    payeeAddress: string
  ) {
    return this._subManagerContract.updatePlan(
      merchantTokenId,
      planIndex,
      name,
      description,
      payeeAddress
    );
  }

  public planManager(): Promise<string> {
    return this._subManagerContract.planManager();
  }

  public charge(subscriptionTokenId: number) {
    return this._subManagerContract.charge(subscriptionTokenId);
  }

  public cancelSubscription(subscriptionTokenId: number) {
    return this._subManagerContract.cancelSubscription(subscriptionTokenId);
  }

  public createSubscription(merchantId: number, planIndex: number) {
    return this._subManagerContract.createSubscription(merchantId, planIndex);
  }

  public acceptTransfer(subscriptionTokenId: number) {
    return this._subManagerContract.acceptTransfer(subscriptionTokenId);
  }

  public subTokenManager(): Promise<string> {
    return this._subManagerContract.subTokenManager();
  }

  public subInfoManager(): Promise<string> {
    return this._subManagerContract.subInfoManager();
  }

  public getMerchantSubscriptionTotal(
    merchantTokenId: number
  ): Promise<BigNumber> {
    return this._subManagerContract.getMerchantSubscriptionTotal(
      merchantTokenId
    );
  }

  public getMerchantPlanSubscriptionTotal(
    merchantTokenId: number,
    planIndex: number
  ): Promise<BigNumber> {
    return this._subManagerContract.getMerchantSubscriptionTotal(
      merchantTokenId,
      planIndex
    );
  }

  public signer(): Signer | Provider {
    return this._signer;
  }

  public async getMerchantOwner(merchantTokenId: number) {
    if (!this._merchantTokenManager) {
      await this.initMerchantManager();
    }
    const owner = await this._merchantTokenManager?.ownerOf(merchantTokenId);
    return owner;
  }

  public async getPlan(merchantTokenId: number, planIndex: number) {
    if (!this._planManger) {
      await this.initPlanManger();
    }
    const plan = await this._planManger?.getPlan(merchantTokenId, planIndex);
    return plan
      ? {
          name: plan.name,
          description: plan.description,
          merchantTokenId: plan.merchantTokenId.toNumber(),
          payeeAddress: plan.payeeAddress,
          paymentToken: plan.paymentToken,
          pricePerBillingPeriod: plan.pricePerBillingPeriod.toString(),
          maxTermLength: plan.maxTermLength.toNumber(),
          billingPeriod: plan.billingPeriod,
          isSBT: plan.isSBT,
          enabled: plan.enabled,
          canResubscribe: plan.canResubscribe,
        }
      : null;
  }

  public async getSubscriptionTokenUri(
    subscriptionTokenId: number
  ): Promise<string> {
    if (!this._subTokenManagerContract) {
      await this.initSubTokenManager();
    }
    const tokenURI = await this._subTokenManagerContract?.tokenURI(
      subscriptionTokenId
    );
    return tokenURI;
  }

  public async getSubInfo(
    subscriptionTokenId: number
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
  > {
    if (!this._subInfoManagerContract) {
      await this.initSubInfoManager();
    }
    const result = await this._subInfoManagerContract?.getSubInfo(
      subscriptionTokenId
    );
    return result;
  }
}
