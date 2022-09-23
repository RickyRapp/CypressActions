import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicModal,
    BaasicTable,
    EmptyState,
    TableFilter
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';
import { AdminReviewModal } from 'themes/application/administration/session/components';
const AdminReviewListTemplate = function ({ adminReviewViewStore }) {
    const {
        tableStore,
        routes,
        authorization,
        adminReviewModal,
        queryUtility
    } = adminReviewViewStore;

    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--primary card--med">
                    <div className="u-mar--bottom--med">
					    <TableFilter queryUtility={queryUtility} />
                    </div>
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
                <BaasicModal modalParams={adminReviewModal} showClose={false}>
					<AdminReviewModal />
				</BaasicModal>
            </Content>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}
function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onReview } = actions;
    if (!isSome(onReview)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onReview) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
                        label='Review'
                        onlyIcon={true}
                        onClick={() => onReview(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}
AdminReviewListTemplate.propTypes = {
    adminReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(AdminReviewListTemplate);
