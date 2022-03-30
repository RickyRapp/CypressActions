import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter, BaasicModal, BaasicButton } from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { ProcessorsCompaniesCreate } from 'application/administration/charity-website/components';

const ProcessorsCompaniesListTemplate = function ({ processorsCompaniesListViewStore }) {
	const { 
        tableStore,
        queryUtility, 
        authorization, 
        createModal,
        routes 
        } = processorsCompaniesListViewStore;

	return (
		<ApplicationListLayout store={processorsCompaniesListViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="row u-mar--bottom--med">
						<div className="col col-sml-12 col-xxlrg-10">
							<TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility} showDefaultSearchFilter={false}></TableFilter>
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
				<ProcessorsCompaniesCreate />
			</BaasicModal>
		</ApplicationListLayout>
	);
};

ProcessorsCompaniesListTemplate.propTypes = {
	processorsCompaniesListViewStore: PropTypes.object.isRequired,
	t: PropTypes.func
};

export default defaultTemplate(ProcessorsCompaniesListTemplate);
