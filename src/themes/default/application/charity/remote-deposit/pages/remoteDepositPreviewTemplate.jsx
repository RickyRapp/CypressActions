import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEmptyState, FormatterResolver, SimpleBaasicTable } from 'core/components';
import { PreviewLayout } from 'core/layouts';
import { GeneralInformationTemplate } from 'themes/application/charity/remote-deposit/components';
import { CardItem } from 'themes/components';
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
            <div className="container--sidebar container--sidebar--base">
                <div>
                    <div className="card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">Certificates</h3>
                        <SimpleBaasicTable
                            tableStore={tableStore}
                        />

                        <div className="container--tny">
                            <div className="card--sml card--secondary u-mar--top--lrg">
                                <CardItem
                                    label={t('SESSION.EDIT.TOTAL_AMOUNT')}
                                    value={
                                        <FormatterResolver
                                            item={{ amount: item && item.amount }}
                                            field="amount"
                                            format={{ type: 'currency' }}
                                        />
                                    }
                                />
                                <CardItem
                                    label={t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_FEE')}
                                    value={
                                        <FormatterResolver
                                            item={{ amount: item && item.totalAmountForCharity }}
                                            field="amount"
                                            format={{ type: 'currency' }}
                                        />
                                    }
                                />
                                <CardItem
                                    label={t('SESSION.EDIT.TOTAL_COUNT')}
                                    value={item && item.grants.length}
                                />
                                <CardItem
                                    label={t('SESSION.EDIT.TOTAL_CHECKS_ON_HOLD')}
                                    value={
                                        <FormatterResolver
                                            item={{ amount: item && item.totalPending }}
                                            field="amount"
                                            format={{ type: 'currency' }}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12">
                        <div className="card--secondary card--tny u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <div className="form__group__label type--wgt--regular">{t('SESSION.PREVIEW.FIELDS.PAYMENT_METHOD')}</div>
                                </div>
                                <div className="col col-sml-6">
                                    <div className="type--wgt--medium u-push">
                                        {item && item.paymentMethod}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card--primary card--med u-mar--bottom--med">
                        <GeneralInformationTemplate item={item} t={t} />
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
