import React from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';
import { object, number } from 'yup';
import denominate from 'components/Denominate/formatters';
import { ActionModalType } from 'helpers/types';
import { denomination, decimals } from 'config';

const NewDelegationContractModal = ({
  show,
  title,
  description,
  handleClose,
  handleContinue,
}: ActionModalType) => {


  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body text-center p-spacer">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            {title}
          </p>
          <p className="mb-spacer">
            Create a new Delegation Smart Contract.
          </p>
          <Formik
            initialValues={{
              amount: denominate({
                input: '0',
                denomination,
                decimals,
                showLastNonZeroDecimal: false,
                addCommas: false,
              }),
              cap: denominate({
                input: '0',
                denomination,
                decimals,
                showLastNonZeroDecimal: false,
                addCommas: false,
              }),
              serviceFee: denominate({
                input: '0',
                denomination,
                decimals,
                showLastNonZeroDecimal: false,
                addCommas: false,
              }),
            }}
            onSubmit={(values) => {
              handleContinue(`${values.amount}@${values.cap}@${values.serviceFee}`);
            }}
          >
            {(props) => {
              const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;
              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      className={`form-control ${errors.amount && touched.amount ? 'is-invalid' : ''
                        }`}
                      id="amount"
                      name="amount"
                      data-testid="amount"
                      required={true}
                      min="0"
                      step="any"
                      value={values.amount}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="cap">Cap (10000000000000000000000)</label>
                    <input
                      type="number"
                      className={`form-control ${errors.cap && touched.cap ? 'is-invalid' : ''
                        }`}
                      id="cap"
                      name="cap"
                      data-testid="cap"
                      required={true}
                      min="0"
                      step="any"
                      value={values.cap}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="serviceFee">Service Fee (2000)</label>
                    <input
                      type="number"
                      className={`form-control ${errors.serviceFee && touched.serviceFee ? 'is-invalid' : ''
                        }`}
                      id="serviceFee"
                      name="serviceFee"
                      data-testid="serviceFee"
                      required={true}
                      min="0"
                      step="any"
                      value={values.serviceFee}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      id="continueDelegate"
                      data-testid="continueDelegate"
                    >
                      Continue
                    </button>
                    <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default NewDelegationContractModal;
