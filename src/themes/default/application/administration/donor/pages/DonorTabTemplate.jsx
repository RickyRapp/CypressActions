import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import {
	DonorAccountInformation,
	DonorSecurityAndPreferencesData,
	DonorCommunicationPreference,
	DonorRecordActivityList,
} from 'application/administration/donor/components';
import renderTabsContent from 'core/utils/renderTabsContent';
import { TabsHeader } from 'core/components';
import { DonorNoteList } from 'application/administration/donor-note/pages';
import { EmailList } from 'application/administration/email/pages';

function DonorTabTemplate({ donorTabViewStore, rootStore }) {
	const { loaderStore, activeIndex } = donorTabViewStore;

	const children = () => {
		return (
			<React.Fragment>
				<div label={'DONOR.TAB.ACCOUNT_INFORMATION'}>
					<DonorAccountInformation />
				</div>
				<div label={'DONOR.TAB.SECURITY_AND_PREFERENCES'} className="container--base">
					<DonorSecurityAndPreferencesData />
				</div>
				<div label={'DONOR.TAB.COMMUNICATION_PREFERENCE'} className="container--base">
					<DonorCommunicationPreference />
				</div>
				<div label={'DONOR.TAB.EMAIL'}>
					<EmailList donorId={rootStore.routerStore.routerState.params.id} />
				</div>
				<div label={'DONOR.TAB.RECORD'}>
					<DonorRecordActivityList donorId={rootStore.routerStore.routerState.params.id} />
				</div>
			</React.Fragment>
		);
	};

	return (
		<Page loading={loaderStore.loading}>
			<PageHeader>
				<TabsHeader tabsStore={donorTabViewStore}>{children().props.children}</TabsHeader>
			</PageHeader>

			<div className="container">{renderTabsContent(activeIndex, children().props.children)}</div>
			{activeIndex == 4 ? '' : <div className={`${activeIndex == 1 || activeIndex == 2 ? "container--base" : ""}`}><DonorNoteList /></div>}
		</Page>
	);
}

DonorTabTemplate.propTypes = {
	donorTabViewStore: PropTypes.object.isRequired,
	rootStore: PropTypes.object,
};

export default defaultTemplate(DonorTabTemplate);
