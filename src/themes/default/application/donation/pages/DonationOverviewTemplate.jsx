import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    SimpleBaasicTable,
    BaasicTableWithRowDetails,
    EmptyState,
    FormatterResolver,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome, addressFormatter, charityFormatter } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import _ from 'lodash'
import { CombinedGrantDetailTemplate, GrantDetailTemplate, SessionDetailTemplate } from 'themes/application/donation/components';
import { DonationReview } from 'application/donation/components'

const DonationOverviewTemplate = function ({ donationViewStore, t, rou }) {
    const {
        tableStore,
        routes,
        authorization,
        charity
    } = donationViewStore;

    const DetailComponent = ({ dataItem }) => {
        if (dataItem.donationType.abrv === 'combined-grant') {
            return <CombinedGrantDetailTemplate item={dataItem} editGrant={routes.editGrant} />
        }
        else if (dataItem.donationType.abrv === 'grant') {
            return <GrantDetailTemplate item={dataItem} />
        }
        else if (dataItem.donationType.abrv === 'session') {
            return <SessionDetailTemplate item={dataItem} />
        }
    }

    return (
        <React.Fragment>
            <ApplicationListLayout store={donationViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">Charity info</h3>
                        <div className="row u-mar--bottom--lrg">
                            <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                <label className="form__group__label">Charity</label>
                                <span className={"input input--med input--text input--disabled"}>
                                    {charity && charityFormatter.format(charity, { value: 'charity-name-display' })}
                                </span>
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                                <label className="form__group__label">Balance</label>
                                <span className={"input input--med input--text input--disabled"}>
                                    {charity &&
                                        <FormatterResolver
                                            item={{ balance: charity.balance }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                </span>
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <label className="form__group__label">Address</label>
                                <span className={"input input--med input--text input--disabled"}>
                                    {charity && addressFormatter.format(_.find(charity.charityAddresses, { primary: true }).address, 'full')}
                                </span>
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <label className="form__group__label">Status</label>
                                <span className={"input input--med input--text input--disabled"}>
                                    {charity && charity.charityStatus.name}
                                </span>
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <label className="form__group__label">Type</label>
                                <span className={"input input--med input--text input--disabled"}>
                                    {charity && charity.charityType.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card--form card--primary card--med">
                        <DonationReview
                            selectedItems={tableStore.selectedItems}
                            charity={charity}
                        />
                        <BaasicTableWithRowDetails
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                            detailComponent={DetailComponent}
                        />
                    </div>
                </Content>
            </ApplicationListLayout>

        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='DONATION.LIST.EMPTY_STATE.TITLE' actionLabel='DONATION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonationOverviewTemplate.propTypes = {
    donationViewStore: PropTypes.object.isRequired,
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

export default defaultTemplate(DonationOverviewTemplate);

