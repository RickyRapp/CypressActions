import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    SimpleBaasicTableWithRowDetails,
    FormatterResolver,
    ApplicationEmptyState,
    BaasicFieldDropdown,
    BasicInput,
    BaasicFormControls,
} from 'core/components';
import { isSome, addressFormatter, charityFormatter } from 'core/utils';
import { PreviewLayout } from 'core/layouts';
import _ from 'lodash'
import { CombinedGrantDetailTemplate, GrantDetailTemplate, SessionDetailTemplate } from 'themes/application/donation/components';

const DonationReviewTemplate = function ({ donationReviewViewStore, t }) {
    const {
        loaderStore,
        routes,
        item,
        tableStore,
        form,
        paymentTypeDropdownStore
    } = donationReviewViewStore;

    const DetailComponent = ({ dataItem }) => {
        if (dataItem.donationType.abrv === 'combined-grant') {
            return <CombinedGrantDetailTemplate items={dataItem.combinedGrants} editGrant={routes.editGrant} />
        }
        else if (dataItem.donationType.abrv === 'grant') {
            return <GrantDetailTemplate item={dataItem.grant} />
        }
        else if (dataItem.donationType.abrv === 'session') {
            return <SessionDetailTemplate item={dataItem.session} />
        }
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };

    return (
        <PreviewLayout
            store={donationReviewViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={false}
        >
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">{t('Charity')}</h3>
                <div className="row u-mar--bottom--lrg">
                    <div className="form__group col col-sml-4 col-lrg-4 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Name')}</label>
                        <span className={"input input--med input--text input--disabled"}>
                            {item && charityFormatter.format(item, { value: 'name-taxid' })}
                        </span>
                    </div>
                    <div className="form__group col col-sml-4 col-lrg-4 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Address')}</label>
                        <span className={"input input--med input--text input--disabled"}>
                            {item && item.charityAddresses && addressFormatter.format(_.find(item.charityAddresses, { isPrimary: true }), 'full')}
                        </span>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Balance')}</label>
                        <span className={"input input--med input--text input--disabled"}>
                            {item &&
                                <FormatterResolver
                                    item={{ balance: item.balance }}
                                    field='balance'
                                    format={{ type: 'currency' }}
                                />}
                        </span>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Status')}</label>
                        <span className={"input input--med input--text input--disabled"}>
                            {item && item.charityStatus.name}
                        </span>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Type')}</label>
                        <span className={"input input--med input--text input--disabled"}>
                            {item && item.charityType.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="card--form card--primary card--med">
                <h3 className="u-mar--bottom--med">{t('Review')}</h3>
                <div className="row u-mar--bottom--lrg">
                    <div className="form__group col col-sml-3 col-lrg-3 u-mar--bottom--sml">
                        <BaasicFieldDropdown store={paymentTypeDropdownStore} field={form.$('paymentTypeId')} />
                    </div>
                    <div className="form__group col col-sml-3 col-lrg-3 u-mar--bottom--sml">
                        <label className="form__group__label">{t('Total amount to review')}</label>
                        {tableStore && tableStore.selectedItems &&
                            <span className={"input input--med input--text input--disabled"}>
                                <FormatterResolver
                                    item={{ totalAmount: _.sumBy(tableStore.selectedItems, 'totalAmountPerType') }}
                                    field='totalAmount'
                                    format={{ type: 'currency' }}
                                />
                            </span>}
                    </div>
                </div>

                <div className="row u-mar--bottom--lrg">
                    {paymentTypeDropdownStore.value &&
                        (paymentTypeDropdownStore.value.abrv === 'ach' ||
                            paymentTypeDropdownStore.value.abrv === 'check' ||
                            paymentTypeDropdownStore.value.abrv === 'bill-pay') &&
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={form.$('paymentNumber')} />
                        </div>}
                    {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                        <div className="form__group col col-lrg-6">
                            <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.BANK_ACCOUNT_NAME_LABEL')}</label>
                            <span className={"input input--med input--text input--disabled"}>{item.charityBankAccounts[0].name}</span>
                        </div>}
                    {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' &&
                        <React.Fragment>
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BasicInput field={form.$('attOf')} />
                            </div>
                            <div className="form__group col col-sml-3 col-lrg-3 u-mar--bottom--sml">
                                <BasicInput field={form.$('addressLine1')} />
                            </div>
                            <div className="form__group col col-sml-3 col-lrg-3 u-mar--bottom--sml">
                                <BasicInput field={form.$('addressLine2')} />
                            </div>
                            <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                                <BasicInput field={form.$('city')} />
                            </div>
                            <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                                <BasicInput field={form.$('state')} />
                            </div>
                            <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                                <BasicInput field={form.$('zipCode')} />
                            </div>
                        </React.Fragment>}
                </div>
                <div className="u-mar--bottom--med">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
                <SimpleBaasicTableWithRowDetails
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                    detailComponent={DetailComponent}
                />
            </div>
        </PreviewLayout>
    )
};

DonationReviewTemplate.propTypes = {
    donationReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit, onReview)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let reviewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onReviewRender) {
            reviewRender = actionsRender.onReviewRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONATION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='DONATION.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(DonationReviewTemplate);

