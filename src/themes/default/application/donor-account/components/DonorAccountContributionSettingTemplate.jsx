import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicModal,
    BaasicTable,
    EmptyState,
    ListContent
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { DonorAccountContributionSettingEditForm } from 'application/donor-account/components';

const DonorAccountContributionSettingTemplate = function ({ donorAccountContributionSettingViewStore, t }) {
    const {
        tableStore,
        routes,
        authorization,
        contributionSettingModal
    } = donorAccountContributionSettingViewStore;

    return (
        <div>
            <ListContent>
                <h3 className="u-mar--bottom--tny">
                    {t('DONOR_ACCOUNT_CONTRIBUTION_SETTING.LIST.TITLE')}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={contributionSettingModal}>
                <DonorAccountContributionSettingEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='DONOR_ACCOUNT_CONTRIBUTION_SETTING.LIST.EMPTY_STATE.TITLE' actionLabel='DONOR_ACCOUNT_CONTRIBUTION_SETTING.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorAccountContributionSettingTemplate.propTypes = {
    donorAccountContributionSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONOR_ACCOUNT_CONTRIBUTION_SETTING.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(DonorAccountContributionSettingTemplate);

