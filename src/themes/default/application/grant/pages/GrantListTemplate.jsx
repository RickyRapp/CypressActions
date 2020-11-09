import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown,
    BaasicInput,
    Export
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const GrantListTemplate = function ({ grantViewStore, rootStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchDonorDropdownStore,
        donationStatusDropdownStore,
        exportConfig
    } = grantViewStore;

    const {
        permissionStore
    } = rootStore

    return (
        <ApplicationListLayout store={grantViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>                    
                        {permissionStore.hasPermission('theDonorsFundAdministrationSection.read') &&
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchDonorDropdownStore} />
                            </div>}
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                id='confirmationNumber'
                                className='input input--med'
                                value={queryUtility.filter.confirmationNumber || ""}
                                onChange={(event) => queryUtility.filter.confirmationNumber = event.target.value}
                                placeholder='GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={donationStatusDropdownStore}
                                placeholder='GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER'
                            />
                        </div>
                    </TableFilter>
                </div>
                <div className="card--primary card--med u-mar--bottom--sml">
                    <div className="row">
                        <div className="col col-sml-12 col-med-12 col-lrg-12">
                            <Export config={exportConfig} />
                        </div>
                    </div>
                </div>
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='GRANT.LIST.EMPTY_STATE.TITLE' actionLabel='GRANT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

GrantListTemplate.propTypes = {
    grantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    rootStore: PropTypes.object
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onRedirect, onPreview } = actions;
    if (!isSome(onEdit) && !isSome(onRedirect) && !isSome(onPreview)) return null;

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
        <td className="table__body--data table__body--data--last">
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
                        icon='u-icon u-icon--approve u-icon--sml' //TODO: change with redirect icon
                        label='GRANT.LIST.BUTTON.REDIRECT'
                        onlyIcon={true}
                        onClick={() => onRedirect(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='GRANT.LIST.BUTTON.PREVIEW'
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
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(GrantListTemplate);

