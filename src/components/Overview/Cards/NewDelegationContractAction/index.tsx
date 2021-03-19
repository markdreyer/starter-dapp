import BigNumber from 'bignumber.js';
import { useDelegationManager } from 'helpers';
import React, { useState } from 'react';
import nominate from 'helpers/nominate';
import NewDelegationContractModal from './NewDelegationContractModal';

const NewDelegationContractAction = () => {
  const { delegationManager } = useDelegationManager();
  const [showNewDelegationContractModal, setShowNewDelegationContractModal] = useState(false);

  const handleSubmit = (args: string) => {
    delegationManager.sendTransaction(args.split('@')[0], 'createNewDelegationContract', `${args.split('@')[1]}@${args.split('@')[2]}`).then();
  };

  return (
    <div>
      <button
        onClick={() => setShowNewDelegationContractModal(true)}
        className="btn btn-primary btn-sm text-white mr-n1"
      >
        New DM Contract
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
