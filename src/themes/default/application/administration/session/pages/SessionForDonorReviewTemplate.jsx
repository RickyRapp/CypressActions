import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable, EmptyState
} from 'core/components';
import { Content } from 'core/layouts';
import EmptyIcon from 'themes/assets/img/building-modern.svg';

const SessionForDonorReviewTemplate = function ({ sessionForDonorReviewViewStore }) {
	const {
		tableStore,
		authorization, 
		routes
    } = sessionForDonorReviewViewStore;
console.log(tableStore);
	return (
		<React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </React.Fragment>
	);
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionForDonorReviewTemplate.propTypes = {
	sessionForDonorReviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};


export default defaultTemplate(SessionForDonorReviewTemplate);
