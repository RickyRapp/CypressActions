import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal,
    BaasicDropdown,
    BaasicInput
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { SelectDonor } from 'application/donor-account/components';

const GrantListTemplate = function ({ grantViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectDonorModal,
        searchDonorAccountDropdownStore,
        grantStatusDropdownStore
    } = grantViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={grantViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchDonorAccountDropdownStore} />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--sml'
                                    value={queryUtility.filter['confirmationNumber'] || ""}
                                    onChange={(event) => queryUtility.filter['confirmationNumber'] = event.target.value}
                                    placeholder='GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                                />
                            </div>
                            {/* TODO
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputRange
                                    valueMin={queryUtility.filter['amountRangeMin'] || undefined}
                                    valueMax={queryUtility.filter['amountRangeMax'] || undefined}
                                    onChangeMin={(value) => queryUtility.filter['amountRangeMin'] = value}
                                    onChangeMax={(value) => queryUtility.filter['amountRangeMax'] = value}
                                    placeholderMin='GRANT.LIST.FILTER.AMOUNT_RANGE_MIN_PLACEHOLDER'
                                    placeholderMax='GRANT.LIST.FILTER.AMOUNT_RANGE_MAX_PLACEHOLDER'
                                />
                            </div> */}
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={grantStatusDropdownStore}
                                    placeholder='GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER'
                                />
                            </div>
                        </TableFilter>
                    </div>
                    <div className="card--form card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                        />
                    </div>
                </Content>
            </ApplicationListLayout>
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='GRANT.LIST.EMPTY_STATE.TITLE' actionLabel='GRANT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

GrantListTemplate.propTypes = {
    grantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onRedirect } = actions;
    if (!isSome(onEdit) && !isSome(onRedirect)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let redirectRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onRedirectRender) {
            redirectRender = actionsRender.onRedirectRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='GRANT.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onRedirect) && redirectRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml' //TODO: change with redirect icon
                        label='GRANT.LIST.BUTTON.REDIRECT'
                        onlyIcon={true}
                        onClick={() => onRedirect(item)}>
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

export default defaultTemplate(GrantListTemplate);

