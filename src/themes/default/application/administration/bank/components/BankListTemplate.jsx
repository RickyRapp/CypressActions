import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    EmptyState,
    BaasicModal,
    BaasicButton
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { BankCreate } from 'application/administration/bank/components';

const BankListTemplate = function ({ bankViewStore }) {
    const {
        tableStore,
        routes,
        authorization,
        createModal
    } = bankViewStore;

    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="type--right">
                    <BaasicButton
                        className="btn btn--med btn--primary u-mar--right--med"
                        label={'LIST_LAYOUT.CREATE_BUTTON'}
                        onClick={routes.create} />
                </div>
                <div className="card--primary card--med u-mar--top--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
            <BaasicModal modalParams={createModal}>
                <BankCreate />
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='BANK.LIST.EMPTY_STATE.TITLE' actionLabel='BANK.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

BankListTemplate.propTypes = {
    bankViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(BankListTemplate);

