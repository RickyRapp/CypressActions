import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    EmptyState,
    TableFilter
} from 'core/components';

import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';

const SessionScanListTemplate = function ({ sessionScanViewStore }) {
    const {
        tableStore,
        routes,
        authorization,
        rootStore,
        queryUtility
    } = sessionScanViewStore;

    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

function renderActions({ item, actions }) {
    const { onEdit, onPreview } = actions;

    return (
        <td>
            <div className="type--right">
                {isSome(onPreview) ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--preview u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
                {isSome(onEdit) && item.isActive ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base"
						label="SESSION.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
            </div>
        </td>
    )
}
SessionScanListTemplate.propTypes = {
    sessionScanViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(SessionScanListTemplate);
