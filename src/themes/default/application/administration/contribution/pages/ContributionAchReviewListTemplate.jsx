import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
} from 'core/components';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const ContributionAchReviewListTemplate = function ({ contributionAchReviewListViewStore, t }) {
	const {
		routes,
		authorization,
        tableStore
	} = contributionAchReviewListViewStore;

	return (
		<React.Fragment>
			<ApplicationListLayout store={contributionAchReviewListViewStore} authorization={authorization}>
                <Content> {console.log(tableStore)}
                    <div className="card--tertiary card--med u-mar--bottom--sml">
                     <BaasicTable
                      authorization={authorization} 
                      tableStore={tableStore} 
                    />
                    </div>
                </Content>
			</ApplicationListLayout>
		</React.Fragment>
	);
};

ContributionAchReviewListTemplate.propTypes = {
	contributionAchReviewListViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionAchReviewListTemplate);
