import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { PreviewLayout } from 'core/layouts';
import { ApplicationEmptyState, Date, FormatterResolver } from 'core/components';

const ContributionDetailsTemplate = function ({ contributionDetailsViewStore, t }) {
    const {
        item,
        loaderStore
    } = contributionDetailsViewStore;

    return (
        <PreviewLayout
            store={contributionDetailsViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={false}
        >
            <h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.DETAILS')}</h3>
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <div className="row row--form">
                            <h3 className="col col-sml-12 u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>
                            <div className="col col-sml-12">
                                {item && item.donor ?
                                    <React.Fragment>
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DONOR_NAME')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {item && (item.donor && item.donor.donorName)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYER_NAME')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {item && item.payerInformation && item.payerInformation.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.CONFRIMATION_NUMBER')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.confirmationNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.STATUS')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.contributionStatus.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DATE_CREATED')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && <Date format="kendo-input-medium" value={item.dateCreated} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DATE_UPDATED')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && <Date format="kendo-input-medium" value={item.dateUpdated} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.ADDRESS_LINE_1')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.addressLine1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.ADDRESS_LINE_2')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.addressLine2}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.EMAIL')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.email}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.CITY')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.city}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.NUMBER')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.number}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.NUMBER_OF_SHARES')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.numberOfShares}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.SECURITY_SYMBOL')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.securitySymbol}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.STATE')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.state}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.ZIP_CODE')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.payerInformation && item.payerInformation.zipCode}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <div className="row row--form">
                            <h3 className="col col-sml-12 u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.PAYMENT_INFORMATION')}</h3>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYMENT_TYPE')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && item.paymentType.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary card--tny u-mar--bottom--sml">
                                    <div className="row row--form">
                                        <div className="col col-sml-6">
                                            <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.AMOUNT')}</div>
                                        </div>
                                        <div className="col col-sml-6">
                                            <div className="type--wgt--medium u-push">
                                                {item && <FormatterResolver
                                                    item={{ amount: item.amount }}
                                                    field='amount'
                                                    format={{ type: 'currency' }}
                                                />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {item && item.isThirdParty &&
                                <React.Fragment>
                                    <div className="col col-sml-12">
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYER_NAME')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {item.payerInformation.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12">
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYER_EMAIL')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {item.payerInformation.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12">
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYER_NUMBER')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {item.payerInformation.number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12">
                                        <div className="card--secondary card--tny u-mar--bottom--sml">
                                            <div className="row row--form">
                                                <div className="col col-sml-6">
                                                    <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.PAYER_ADDRESS')}</div>
                                                </div>
                                                <div className="col col-sml-6">
                                                    <div className="type--wgt--medium u-push">
                                                        {<FormatterResolver
                                                            item={{ address: item.payerInformation }}
                                                            field='address'
                                                            format={{ type: 'address', value: 'full' }}
                                                        />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </React.Fragment>}
                        </div>
                    </div>
                </div>
                {/* <div className="col col-sml-12 col-lrg-4">
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.SUMMARY')}</h3>
                        <div className="row row--form">
                            <div className="col col-sml-12 u-mar--bottom--sml">
                                <div className="card--secondary card--med type--center">
                                    <div className="type--lrg type--wgt--bold type--color--note">
                                        {item && item.donor && <FormatterResolver
                                            item={{ amount: item.donor.totalMoneyGiven }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />}
                                    </div>
                                    <div className="type--base type--wgt--medium">
                                        {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_GIVEN')}
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="card--secondary--light card--med type--center">
                                    <div className="type--lrg type--wgt--bold type--color--note">
                                        {item && item.donor && <FormatterResolver
                                            item={{ amount: item.donor.totalMoneyUpcoming }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />}
                                    </div>
                                    <div className="type--base type--wgt--medium">
                                        {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_UPCOMING')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </PreviewLayout>
    )
};

ContributionDetailsTemplate.propTypes = {
    contributionDetailsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionDetailsTemplate);

