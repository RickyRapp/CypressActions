import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter, BaasicModal, BaasicButton } from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { CharityWebsiteCreate } from 'application/administration/charity-website/components';

const CharityWebsiteListTemplate = function ({ charityWebsiteViewStore }) {
	const { tableStore, queryUtility, authorization, createModal, routes } = charityWebsiteViewStore;
	
	return (
		<ApplicationListLayout store={charityWebsiteViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="row u-mar--bottom--sml">
						<div className="col col-sml-12 col-xxlrg-10">
							<TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}></TableFilter>
						</div>
						<div className="col col-sml-12 col-xxlrg-2 type--right">
							<BaasicButton
								className="btn btn--med btn--primary"
								label={'LIST_LAYOUT.CREATE_BUTTON'}
								onClick={routes.create}
							/>
						</div>
					</div>
					<BaasicTable authorization={authorization} tableStore={tableStore} />
				</div>
			</Content>
			<BaasicModal modalParams={createModal}>
				<CharityWebsiteCreate />
			</BaasicModal>
		</ApplicationListLayout>
	);
};

CharityWebsiteListTemplate.propTypes = {
	charityWebsiteViewStore: PropTypes.object.isRequired,
	t: PropTypes.func
};

export default defaultTemplate(CharityWebsiteListTemplate);
