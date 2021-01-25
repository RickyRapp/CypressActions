import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BankAccount, FormatterResolver } from 'core/components';
import { DonorBankAccountEdit } from 'application/donor/donor/components';

const DonorBankAcountListTemplate = function ({ donorBankAccountViewStore, t }) {
    const {
        bankAccounts,
        onEnableEditClick,
        onCancelEditClick,
        onEditCompleted,
        isEditEnabled,
        editId
    } = donorBankAccountViewStore;

    return (
        <div>
            <div className="row u-mar--bottom--sml">
                <div className="col col-sml-12 col-lrg-3">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_BANK_ACCOUNT')}</h3>
                </div>
                <div className={`col col-sml-12 col-lrg-${isEditEnabled ? '12' : '9'}`}>
                    <div className="row u-mar--bottom--sml">
                        {bankAccounts.filter(c => c.id !== editId).map(c => {

                            return (
                                <div key={c.id} className="col col-sml-12 col-lrg-12">
                                    <p
                                        className="type--base type--wgt--medium scale"
                                        title='Click to edit'
                                        onClick={() => onEnableEditClick(c)}>
                                        <BankAccount format='full' value={c} />
                                    </p>
                                </div>
                            )
                        })}
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled ?
                                <DonorBankAccountEdit
                                    editId={editId}
                                    onCancelEditClick={onCancelEditClick}
                                    onEditCompleted={onEditCompleted} />
                                :
                                <span
                                    title={'Click to insert'}
                                    onClick={() => onEnableEditClick(null)}>
                                    <span>Add new bank account</span>
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

DonorBankAcountListTemplate.propTypes = {
    donorBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorBankAcountListTemplate);
