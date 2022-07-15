import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import { BaasicButton, BaasicDropdown, BaasicInput, FormatterResolver } from 'core/components';

function WithdrawFundCreateTemplate({ withdrawFundCreateViewStore, t }) {
    const {
        accountBanalce,
        isACH,
        onChange,
        charityAddress,
        bankAccountDropdownStore,
        createWithdraw,
        changeValue,
        amountValidationMessage,
        bankAccountValidationMessage,
        addressValidationMessage
    } = withdrawFundCreateViewStore;

    return (
        <Page>
            <div className="card--primary card--med withdraw__container">
                <p className="withdraw__title">Available Balance</p>
                <p className="withdraw__price">
                    <FormatterResolver
                        item={{ balance: accountBanalce }}
                        field="balance"
                        format={{ type: 'currency' }}
                    />
                </p>
                <p className="type--lrg">How much would you like to withdraw?</p>
                {/* <p className="type--sml type--color--opaque u-mar--bottom--sml">Minimum $500 investment required.</p> */}

                <div className="withdraw__form">
                    <div className="u-mar--top--sml">
                        <BaasicInput
                            id="withdrawAmount"
                            className="input input--lrg"
                            placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
                            onChange={e => {
                                changeValue(e.target.value);
                            }}
                        />
                        <p class="validation__message">{amountValidationMessage}</p>
                    </div>
                    <div className="u-mar--top--sml">
                        <div className="input--switch u-clearfix">
                            <BaasicInput
                                type="radio"
                                id={"isACH"}
                                name={"isACH"}
                                checked={isACH === true}
                                onChange={e => {
                                    e.target.checked = true;
                                    onChange(e.target.checked);
                                }}
                                label={`ACH`}
                                wrapperClassName="input--switch__wrapper"
                            />
                            <BaasicInput
                                type="radio"
                                id={"isCheck"}
                                name={"isCheck"}
                                checked={isACH === false}
                                onChange={e => {
                                    e.target.checked = false;
                                    onChange(e.target.checked);
                                }}
                                label={`Check by mail`}
                                wrapperClassName="input--switch__wrapper"
                            />
                        </div>
                        {isACH ?
                            <div className="u-mar--top--sml">
                                {bankAccountDropdownStore.length > 1 || bankAccountDropdownStore.originalItems.length > 1 ?
                                    <div className="form__group">
                                        <BaasicDropdown
                                            store={bankAccountDropdownStore}
                                            placeholder="BANK_ACCOUNT.LIST.EMPTY_STATE.SELECT"
                                        // onChange={selectBankAccount}
                                        />
                                        <p class="validation__message">{bankAccountValidationMessage}</p>
                                    </div>
                                    : <p>{t("BANK_ACCOUNT.LIST.EMPTY_STATE.TITLE")}</p>}
                            </div>
                            :
                            <div className="u-mar--top--sml">
                                <div className="row row--form">
                                    <p class="validation__message">{addressValidationMessage}</p>
                                    <div className="form__group col col-sml-12 col-lrg-13">
                                        <p>{t('ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_LABEL')}</p>
                                        <BaasicInput
                                            id="addressLine1"
                                            className="input input--lrg"
                                            placeholder="ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER"
                                            value={charityAddress.addressLine1}
                                            onChange={event => (charityAddress.addressLine1 = event.target.value)}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-13">
                                        <p>{t('ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_LABEL')}</p>
                                        <BaasicInput
                                            id="addressLine2"
                                            className="input input--lrg"
                                            placeholder="ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_PLACEHOLDER"
                                            value={charityAddress.addressLine2}
                                            onChange={event => (charityAddress.addressLine2 = event.target.value)}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <p>{t('ADDRESS.EDIT.FIELDS.CITY_LABEL')}</p>
                                        <BaasicInput
                                            id="city"
                                            className="input input--lrg"
                                            placeholder="ADDRESS.EDIT.FIELDS.CITY_PLACEHOLDER"
                                            value={charityAddress.city}
                                            onChange={event => (charityAddress.city = event.target.value)}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <p>{t('ADDRESS.EDIT.FIELDS.STATE_LABEL')}</p>
                                        <BaasicInput
                                            id="state"
                                            className="input input--lrg"
                                            placeholder="ADDRESS.EDIT.FIELDS.STATE_PLACEHOLDER"
                                            value={charityAddress.state}
                                            onChange={event => (charityAddress.state = event.target.value)}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <p>{t('ADDRESS.EDIT.FIELDS.ZIPCODE_LABEL')}</p>
                                        <BaasicInput
                                            id="zipCode"
                                            className="input input--lrg"
                                            placeholder="ADDRESS.EDIT.FIELDS.ZIPCODE_PLACEHOLDER"
                                            value={charityAddress.zipCode}
                                            onChange={event => (charityAddress.zipCode = event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <BaasicButton
                        className="btn btn--med btn--primary"
                        label={'LIST_LAYOUT.WITHDRAW_FUNDS'}
                        onClick={createWithdraw}
                    />
                </div>
            </div>
        </Page>
    );
}

WithdrawFundCreateTemplate.propTypes = {
    withdrawFundCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
};

export default defaultTemplate(WithdrawFundCreateTemplate);
