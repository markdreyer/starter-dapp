import { useContext } from 'context';
import { DelegationManager } from 'contracts';

export default function useDelegationManager() {
    const { dapp, delegationContract } = useContext();
    const delegationManager = new DelegationManager(dapp.proxy, delegationContract, dapp.provider);
    return { delegationManager };
}
