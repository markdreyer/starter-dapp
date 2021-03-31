import {
    ProxyProvider,
    ContractFunction,
    Transaction,
    TransactionPayload,
    Balance,
    GasLimit,
    IDappProvider,
    WalletProvider,
    HWProvider,
    Address,
    SmartContract,
} from '@elrondnetwork/erdjs';
import { setItem } from '../storage/session';
import { delegationManagerContractData } from '../config';
import { NetworkConfig } from '../helpers/contractDataDefinitions';

class DelegationManager {
    contract: SmartContract;
    proxyProvider: ProxyProvider;
    signerProvider?: IDappProvider;
    networkConfig?: NetworkConfig;

    constructor(provider: ProxyProvider, delegationManagerContract?: string, signer?: IDappProvider, networkConfig?: NetworkConfig) {
        const address = new Address(delegationManagerContract);
        this.contract = new SmartContract({ address });
        this.proxyProvider = provider;
        this.signerProvider = signer;
        this.networkConfig = networkConfig;
    }

    async sendTransaction(
        value: string,
        transcationType: string,
        args: string = ''
    ): Promise<Transaction> {
        if (!this.signerProvider) {
            throw new Error(
                'You need a singer to send a transaction, use either WalletProvider or LedgerProvider'
            );
        }

        switch (this.signerProvider.constructor) {
            case WalletProvider:
                // Can use something like this to handle callback redirect
                setItem('transaction_identifier', true, 120);
                return this.sendTransactionBasedOnType(value, transcationType, args);
            case HWProvider:
                return this.sendTransactionBasedOnType(value, transcationType, args);
            default:
                console.warn('invalid signerProvider');
        }

        throw new Error('invalid signerProvider');
    }

    private async sendTransactionBasedOnType(
        value: string,
        transcationType: string,
        args: string = ''
    ): Promise<Transaction> {
        let delegationManagerContract = delegationManagerContractData.find(d => d.name === transcationType);
        if (!delegationManagerContract) {
            throw new Error('The contract for this action in not defined');
        } else {
            let funcName = delegationManagerContract.data;
            if (args !== '') {
                funcName = `${delegationManagerContract.data}${args}`;
            }
            const func = new ContractFunction(funcName);
            let payload = TransactionPayload.contractCall()
                .setFunction(func)
                .build();
            let transaction = new Transaction({
                chainID: this.networkConfig?.chainId,
                receiver: this.contract.getAddress(),
                value: Balance.eGLD(value),
                gasLimit: new GasLimit(delegationManagerContract.gasLimit),
                data: payload,
            });

            // @ts-ignore
            let result = await this.signerProvider.sendTransaction(transaction);

            return result;
        }
    }
}

export { DelegationManager };
