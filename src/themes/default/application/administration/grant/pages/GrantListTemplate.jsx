import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicDropdown,
    BaasicInput,
    Export,
    BaasicModal
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const GrantListTemplate = function ({ grantViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchDonorDropdownStore,
        donationStatusDropdownStore,
        exportConfig,
        selectDonorModal
    } = grantViewStore;

    return (
        <ApplicationListLayout store={grantViewStore} authorization={authorization}>
            <PageHeader routes={routes}></PageHeader>
            <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown store={searchDonorDropdownStore} />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                id='confirmationNumber'
                                className='input input--lrg'
                                value={queryUtility.filter.confirmationNumber || ""}
                                onChange={(event) => queryUtility.filter.confirmationNumber = event.target.value}
                                placeholder='GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
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
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

GrantListTemplate.propTypes = {
    grantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
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
        <td>
            <div className="type--right">
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

