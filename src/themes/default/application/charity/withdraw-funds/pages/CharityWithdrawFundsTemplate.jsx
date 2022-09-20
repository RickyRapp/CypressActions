/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import { BaasicButton, BaasicDropdown, BaasicInput, FormatterResolver } from 'core/components';

function CharityWithdrawFundsTemplate({ charityWithdrawFundsViewStore, t }) {
    const {
        availableBalance,
        isACH,
        onChange,
        charityAddress,
        bankAccountDropdownStore,
        createWithdraw,
        changeValue,
        amountValidationMessage,
        bankAccountValidationMessage,
        addressValidationMessage
    } = charityWithdrawFundsViewStore;
    const hasBankAccount = bankAccountDropdownStore.length >= 1 || bankAccountDropdownStore.originalItems.length >= 1;

    const handleAchTab = (e) => {
        e.target.checked = true;
        onChange(e.target.checked);
    }

    const handleEmailTab = (e) => {
        e.target.checked = false;
        onChange(e.target.checked);
    }

    return (
        <Page>
            <div className="container--base container--sidebar">
                <div className="c-deposit__list c-deposit__list--2">
                    <CardTab action={handleAchTab} title={"ACH"} isActive={isACH} icon={"ach"} />
                    <CardTab action={handleEmailTab} title={"Check by mail"} isActive={!isACH} icon={"check"} />
                </div>
            </div>

            <div className="container--lrg container--sidebar">
                <div className="card--primary card--med u-order--1--from--xlrg">
                    {hasBankAccount || !isACH && <h3 className="u-mar--bottom--med">How much would you like to withdraw?</h3>}
                    <div>
                        {hasBankAccount || !isACH &&
                            <div className="u-mar--top--sml">
                                <BaasicInput
                                    id="withdrawAmount"
                                    className="input input--lrg"
                                    placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
                                    onChange={e => {
                                        changeValue(e.target.value);
                                    }}
                                />
                                <p className="validation__message">{amountValidationMessage}</p>
                            </div>
                        }
                        <div>
                            {isACH ?
                                <React.Fragment>
                                    {hasBankAccount ?
                                        <div className="u-mar--top--sml">
                                            <div className="form__group">
                                                <BaasicDropdown
                                                    store={bankAccountDropdownStore}
                                                    placeholder="BANK_ACCOUNT.LIST.EMPTY_STATE.SELECT"
                                                />
                                                <p className="validation__message">{bankAccountValidationMessage}</p>
                                            </div>
                                        </div>
                                        :
                                        <EmptyState t={t} />
                                    }
                                </React.Fragment>
                                :
                                <EmailForm charityAddress={charityAddress} t={t} addressValidationMessage={addressValidationMessage} />
                            }
                        </div>
                    </div>
                    {!isACH &&
                        <div>
                            <BaasicButton
                                className="btn btn--med btn--primary"
                                label={'LIST_LAYOUT.WITHDRAW_FUNDS'}
                                onClick={createWithdraw}
                            />
                        </div>
                    }
                </div>

                <div className="u-order--1 u-order--2--from--lrg">
                    <AvailableBalance availableBalance={availableBalance} />
                </div>
            </div >
        </Page >
    );
}

CharityWithdrawFundsTemplate.propTypes = {
    charityWithdrawFundsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
};

const EmptyState = ({ t }) => {
    return (
        <div className="emptystate--primary">
            <i className="u-icon u-icon--lrg u-icon--bank--grey u-mar--bottom--tny"></i>
            <p className="emptystate--primary__title u-mar--bottom--med">{t("BANK_ACCOUNT.LIST.EMPTY_STATE.TITLE")}</p>

            <button className="btn btn--med btn--med--wide btn--secondary " title={'Click to insert'}>
                Connect your bank
            </button>
        </div>
    )
}

const CardTab = ({ isActive, action, title, icon }) => {
    return (
        <div className={`c-deposit__card ${isActive ? "active" : ""}`} onClick={action}>
            <div className="flex--grow--1">
                <i className={`u-icon u-icon--med u-icon--${icon} ${isActive ? "active" : ""}`}></i>
            </div>
            <div className="flex--grow--2">
                <h5 className={`type--base type--wgt--medium ${isActive ? "type--color--negative" : ""}`}>
                    {title}
                </h5>
            </div>
        </div>
    )
}

const AvailableBalance = ({ availableBalance }) => {
    return (
        <div className="card--primary card--med ">
            <p className="dashboard-card__body--title">Available Balance</p>
            <p className="dashboard-card__body--amount">
                <FormatterResolver
                    item={{ balance: availableBalance }}
                    field="balance"
                    format={{ type: 'currency' }}
                />
            </p>
        </div>
    )
}

const EmailForm = ({ charityAddress, t, addressValidationMessage }) => {
    return (
        <div className="u-mar--top--sml">
            <div className="row row--form">
                <p className="validation__message">{addressValidationMessage}</p>
                <div className="form__group col col-sml-12 col-lrg-13">
                    <p>{t('ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_LABEL')}</p>
                    <BaasicInput
                        id="addressLine1"
                        className="input input--lrg"
                        placeholder="ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER"
                        value={charityAddress.addressLine1}
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        onChange={event => (charityAddress.zipCode = event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default defaultTemplate(CharityWithdrawFundsTemplate);
