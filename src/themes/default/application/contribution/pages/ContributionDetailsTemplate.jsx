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
            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.DETAILS')}</h3>
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <h3  className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
                                    <div className="col col-sml-6">
                                        <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DONOR_NAME')}</div>
                                    </div>
                                    <div className="col col-sml-6">
                                        <div className="type--wgt--medium u-push">
                                            {item && item.donor.donorName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
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
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
                                    <div className="col col-sml-6">
                                        <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.THIRD_PARTY')}</div>
                                    </div>
                                    <div className="col col-sml-6">
                                        <div className="type--wgt--medium u-push">
                                            {item && item.isThirdParty ? 'Yes' : 'No'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
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
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
                                    <div className="col col-sml-6">
                                        <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DATE_CREATED')}</div>
                                    </div>
                                    <div className="col col-sml-6">
                                        <div className="type--wgt--medium u-push">
                                            {item && <Date format="full-date" value={item.dateCreated} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
                                    <div className="col col-sml-6">
                                        <div className="form__group__label type--wgt--regular">{t('CONTRIBUTION.DETAILS.DATE_UPDATED')}</div>
                                    </div>
                                    <div className="col col-sml-6">
                                        <div className="type--wgt--medium u-push">
                                            {item && <Date format="full-date" value={item.dateUpdated} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.PAYMENT_INFORMATION')}</h3>
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
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
                            <div className="col col-sml-12">
                                <div className="row card--secondary card--tny u-mar--bottom--sml">
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
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-4">
                    <div className="card card--primary card--med u-mar--bottom--med">
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.SUMMARY')}</h3>
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-6">
                                <div className="card--secondary card--med type--center">
                                    <div className="type--lrg type--wgt--bold type--color--note">
                                        <FormatterResolver
                                            item={{ amount: 1500 }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </div>
                                    <div className="type--base type--wgt--medium">
                                        {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_GIVEN')}
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                <div className="card--secondary--light card--med type--center">
                                    <div className="type--lrg type--wgt--bold type--color--note">
                                        <FormatterResolver
                                            item={{ amount: 2500 }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                            />
                                    </div>
                                    <div className="type--base type--wgt--medium">
                                        {t('CONTRIBUTION.DETAILS.TOTAL_MONEY_UPCOMING')}
                                    </div>
                                </div>
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

