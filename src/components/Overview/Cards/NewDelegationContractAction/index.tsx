import { useDelegationManager } from 'helpers';
import React, { useState } from 'react';
import NewDelegationContractModal from './NewDelegationContractModal';

const NewDelegationContractAction = () => {
  const { delegationManager } = useDelegationManager();
  const [showNewDelegationContractModal, setShowNewDelegationContractModal] = useState(false);

  const handleSubmit = (amount: string) => {
    delegationManager.sendTransaction(amount, 'createNewDelegationContract', '00@0e').then();
  };

  return (
    <div>
      <button
        onClick={() => setShowNewDelegationContractModal(true)}
        className="btn btn-primary btn-sm text-white mr-n1"
      >
        New Contract
      </button>
      <NewDelegationContractModal
        show={showNewDelegationContractModal}
        title="New Delegation Contract"
        description="Create a new delegation contract."
        handleClose={() => {
          setShowNewDelegationContractModal(false);
        }}
        handleContinue={handleSubmit}
      />
    </div>
  );
};

export default NewDelegationContractAction;
