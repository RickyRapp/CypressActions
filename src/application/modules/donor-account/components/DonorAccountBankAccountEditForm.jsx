import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicButton,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorAccountBankAccountEditForm extends Component {
    render() {
        const { modalParams, useDonorContactInformations, t } = this.props;
        const { formBankAccount } = modalParams.data;

        return (
            <section className='w--600--px'>
                <form className='form' onSubmit={formBankAccount.onSubmit}>
                    <h3 className="u-mar--bottom--med">{formBankAccount.$('id').value ? t('BANK_ACCOUNT.EDIT.TITLE') : t('BANK_ACCOUNT.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('name')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('description')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountNumber')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('routingNumber')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-12">
                            <BasicFieldCheckbox field={formBankAccount.$('isThirdPartyAccount')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address.addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address').$('addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address').$('city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address').$('state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address').$('zipCode')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-3">
                            <BasicInput field={formBankAccount.$('accountHolder').$('address').$('description')} />
                        </div>
                        {formBankAccount.$('isThirdPartyAccount').value === false &&
                            <div className="form__group col col-sml-6 col-lrg-3">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations(true, 'address')}
                                    className='btn btn--tny btn--secondary'
                                    type='button'
                                    label={t("BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS")}
                                />
                            </div>
                        }
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BasicInput field={formBankAccount.$('accountHolder').$('emailAddress').$('email')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BasicInput field={formBankAccount.$('accountHolder').$('emailAddress').$('description')} />
                        </div>
                        {formBankAccount.$('isThirdPartyAccount').value === false &&
                            <div className="form__group col col-sml-12 col-lrg-4">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations(true, 'emailAddress')}
                                    className='btn btn--tny btn--secondary'
                                    type='button'
                                    label={t("BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS")}
                                />
                            </div>
                        }
                    </div>

                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BasicInput field={formBankAccount.$('accountHolder').$('phoneNumber').$('number')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-4">
                            <BasicInput field={formBankAccount.$('accountHolder').$('phoneNumber').$('description')} />
                        </div>
                        {formBankAccount.$('isThirdPartyAccount').value === false &&
                            <div className="form__group col col-sml-12 col-lrg-4">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations(true, 'phoneNumber')}
                                    className='btn btn--tny btn--secondary'
                                    type='button'
                                    label={t("BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER")}
                                />
                            </div>
                        }
                    </div>

                    <BaasicButton
                        className='btn btn--base btn--primary'
                        type='submit'
                        label='Submit'
                    />
                </form>
            </section>
        );
    }
}

DonorAccountBankAccountEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    useDonorContactInformations: PropTypes.func.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountBankAccountEditForm);
