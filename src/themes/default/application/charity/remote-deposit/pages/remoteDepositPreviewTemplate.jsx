import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState, FormatterResolver, Date, SimpleBaasicTable
} from 'core/components';
import { PreviewLayout } from 'core/layouts';

function RemoteDepositPreviewTemplate({ remoteDepositPreviewViewStore, t }) {
    const {
        item,
        tableStore,
        loaderStore
    } = remoteDepositPreviewViewStore;
    return (
        <PreviewLayout
            store={remoteDepositPreviewViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={false}
        >
            <div className="card--primary card--med u-mar--bottom--med">
                <div className="row">
                    <div className="col col-sml-12">
                        <h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.charity && item.charity.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.FULL_NAME_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.fullName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.PHONE_NUMBER_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.phoneNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.EMAIL_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}</div>
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
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.ORIGINAL_CONFIRMATION_NUMBER_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.originalConfirmationNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.DATE_CREATED_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && <Date format="full" value={item.dateCreated} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.CHECK_COUNT_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.checkCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.ESTIMATED_AMOUNT_LABEL')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.estimatedAmount}
                                        <b>&nbsp;{item && item.estimatedAmount && (item.amount - item.estimatedAmount > 0 ? '(↑)' : (item.amount - item.estimatedAmount == 0 ? '(=)' : '(↓)'))}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Certificates</h3>
                <SimpleBaasicTable
                    tableStore={tableStore}
                />
                <div className="row u-mar--top--lrg">
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.EDIT.TOTAL_AMOUNT')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        <FormatterResolver
                                            item={{ amount: item && item.amount }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_FEE')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        <FormatterResolver
                                            item={{ amount: item && item.totalAmountForCharity }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.EDIT.TOTAL_COUNT')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.grants.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.EDIT.TOTAL_CHECKS_ON_HOLD')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        <FormatterResolver
                                            item={{ amount: item && item.totalPending }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PreviewLayout>
    )
}

RemoteDepositPreviewTemplate.propTypes = {
    remoteDepositPreviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(RemoteDepositPreviewTemplate);
