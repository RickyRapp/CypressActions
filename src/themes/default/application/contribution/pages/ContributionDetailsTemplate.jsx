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
            <h3>{t('CONTRIBUTION.DETAILS.DETAILS')}</h3>
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <h3>{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.DONOR_NAME')}</div>
                                {item && item.donor.donorName}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.CONFRIMATION_NUMBER')}</div>
                                {item && item.confirmationNumber}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.THIRD_PARTY')}</div>
                                {item && item.isThirdParty ? 'Yes' : 'No'}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.STATUS')}</div>
                                {item && item.contributionStatus.name}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.DATE_CREATED')}</div>
                                {item && <Date format="full-date" value={item.dateCreated} />}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.DATE_UPDATED')}</div>
                                {item && <Date format="full-date" value={item.dateUpdated} />}
                            </div>
                        </div>
                    </div>
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <h3>{t('CONTRIBUTION.DETAILS.PAYMENT_INFORMATION')}</h3>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.PAYMENT_TYPE')}</div>
                                {item && item.paymentType.name}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="form__group__label">{t('CONTRIBUTION.DETAILS.AMOUNT')}</div>
                                {item && <FormatterResolver
                                    item={{ amount: item.amount }}
                                    field='amount'
                                    format={{ type: 'currency' }}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-4">
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3>{t('CONTRIBUTION.DETAILS.SUMMARY')}</h3>
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-6">
                                <div>
                                    <FormatterResolver
                                        item={{ amount: 1500 }}
                                        field='amount'
                                        format={{ type: 'currency' }}
                                    />
                                </div>
                                {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_GIVEN')}
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                <div>
                                    <FormatterResolver
                                        item={{ amount: 2500 }}
                                        field='amount'
                                        format={{ type: 'currency' }}
                                    />
                                </div>
                                {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_UPCOMING')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PreviewLayout>
    )
};

ContributionDetailsTemplate.propTypes = {
    contributionDetailsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionDetailsTemplate);

