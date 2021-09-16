import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, BaasicButton, BaasicDropdown } from 'core/components';
import { Content } from 'core/layouts';

function WelcomeExistingAccountsEmailsTemplate({ welcomeExistingAccountsEmailsViewStore }) {
    const {
        tableStore,
        searchDonorDropdownStore,
        donorId,
        onSendEmail
    } = welcomeExistingAccountsEmailsViewStore;

    return (
        <Content>
            <div className="card--primary card--med">
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                    loading={tableStore.loading}
                />
            </div>
            <div className="card--primary card--med u-mar--top--med">
                <div className="row">
                    <div className="col col-sml-12 col-xxlrg-3 type--right">
                        <BaasicDropdown
                            placeholder={'SELECT_DONOR_PLACEHOLDER'}
                            className='input--dropdown'
                            store={searchDonorDropdownStore}
                        />
                    </div>
                </div>
                {donorId &&
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
                        label='TEST.SCHEDULED_SETTING.LIST.BUTTON.RUN'
                        onClick={() => onSendEmail()}>
                    </BaasicButton>}
            </div>
        </Content >
    )
}

WelcomeExistingAccountsEmailsTemplate.propTypes = {
    welcomeExistingAccountsEmailsViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onClick } = actions;
    if (!isSome(onClick)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onClick) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
                        label='TEST.SCHEDULED_SETTING.LIST.BUTTON.RUN'
                        onlyIcon={true}
                        onClick={() => onClick(item.abrv)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
};

export default defaultTemplate(WelcomeExistingAccountsEmailsTemplate);
