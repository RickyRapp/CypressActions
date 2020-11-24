import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicModal, FormatterResolver, SimpleBaasicTable } from 'core/components';
import { MonthlyFeeJsonTemplate } from 'themes/application/activity/transaction/components';
import { isSome } from 'core/utils';

const TransactionDonorTemplate = function ({ transactionDonorViewStore, t }) {
    const {
        donor,
        isPendingTransactionVisible,
        pendingTransactionTableStore,
        onExpandPendingTransactionClick,
        previewFeesModal
    } = transactionDonorViewStore;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="card--form card--med u-mar--bottom--sml">
                        <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.YOUR_FUNDS')}</h3>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-sml-12 col-lrg-3">
                                <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.AVAILABLE_BALANCE')}</h5 >
                                <div>
                                    <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.AVAILABLE_BALANCE_DESCRIPTION')}</p >
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 type--base type--wgt--bold type--color--note">
                                {donor &&
                                    <FormatterResolver
                                        item={{ balance: donor.availableBalance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-sml-12 col-lrg-3">
                                <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.PRESENT_BALANCE')}</h5>
                                <div>
                                    <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.PRESENT_BALANCE_DESCRIPTION')}</p >
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 type--base type--wgt--bold type--color--note">
                                {donor &&
                                    <FormatterResolver
                                        item={{ balance: donor.presentBalance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sml-12 u-mar--bottom--tny">
                    <div className="card--primary card--med u-mar--bottom--sml">
                        <div className="row">
                            <div className="col col-sml-12 u-mar--bottom--sml">
                                <span className="type--base type--wgt--bold type--color--note">SHOW PENDING TRANSACTIONS</span>
                                <BaasicButton
                                    className="btn btn--icon"
                                    onlyIconClassName="u-mar--right--sml"
                                    icon={`u-icon ${isPendingTransactionVisible ? 'u-icon--close' : 'u-icon--arrow-down'} u-icon--sml`}
                                    label='EXPAND'
                                    onlyIcon={true}
                                    onClick={() => onExpandPendingTransactionClick()}>
                                </BaasicButton>
                            </div>
                            {isPendingTransactionVisible &&
                                <div className="col col-sml-12 u-mar--bottom--sml">
                                    <SimpleBaasicTable
                                        tableStore={pendingTransactionTableStore}
                                        actionsComponent={renderActions}
                                    />
                                </div>}
                            <div className="col col-sml-12 type--base type--wgt--medium type--color--opaque">
                                <div className="row u-mar--bottom--tny">
                                    <div className="col col-sml-12 col-lrg-3">
                                        Pending grants:
                                </div>
                                    <div className="col col-sml-12 col-lrg-3">
                                        $123 (TODO)
                                </div>
                                </div>
                                <div className="row u-mar--bottom--tny">
                                    <div className="col col-sml-12 col-lrg-3">
                                        Checks on hold:
                                </div>
                                    <div className="col col-sml-12 col-lrg-3">
                                        $123 (TODO)
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BaasicModal modalParams={previewFeesModal}>
                <MonthlyFeeJsonTemplate />
            </BaasicModal>
        </React.Fragment>
    )
}

TransactionDonorTemplate.propTypes = {
    transactionDonorViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onPreview } = actions;
    if (!isSome(onPreview)) return null;

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='TEST.SCHEDULED_SETTING.LIST.BUTTON.RUN'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object
};

export default defaultTemplate(TransactionDonorTemplate);