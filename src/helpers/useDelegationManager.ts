import { delegationManagerContract } from 'config';
import { useContext } from 'context';
import { DelegationManager } from 'contracts';

export default function useDelegationManager() {
    const { dapp } = useContext();
    const delegationManager = new DelegationManager(dapp.proxy, delegationManagerContract, dapp.provider);
    return { delegationManager };
}
