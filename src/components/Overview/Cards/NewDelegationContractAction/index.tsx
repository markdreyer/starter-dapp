import BigNumber from 'bignumber.js';
import { useDelegationManager } from 'helpers';
import React, { useState } from 'react';
import nominate from 'helpers/nominate';
import NewDelegationContractModal from './NewDelegationContractModal';

const NewDelegationContractAction = () => {
  const { delegationManager } = useDelegationManager();
  const [showNewDelegationContractModal, setShowNewDelegationContractModal] = useState(false);

  const handleSubmit = (args: string) => {
    const cap = args.split('@')[0],
      serviceFee = args.split('@')[1];
    const hexCap = toHex(cap);
    const hexServiceFee = toHex(serviceFee);
    delegationManager.sendTransaction('1250000000000000000000', 'createNewDelegationContract', `${hexCap}@${hexServiceFee}`).then();
  };

  const toHex = (value: string) => {
    let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

    if (val.length % 2 !== 0) {
      val = '0' + val;
    }
    return val;
  };

  return (
    <div>
      <button
        onClick={() => setShowNewDelegationContractModal(true)}
        className="btn btn-primary btn-sm text-white mr-n1"
      >
        Change
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
