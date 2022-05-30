import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
} from 'core/components';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';

function DonationLogTemplate({ donationLogViewStore, t }) {
    const {
        tableStore,
        authorization,
    } = donationLogViewStore;

    return (
        <Content>
            <div>
                <BaasicTable 
                    authorization={authorization} 
                    tableStore={tableStore} 
                    actionsComponent={renderActions} 
                />
            </div>
        </Content>
    )
}

DonationLogTemplate.propTypes = {
    donationLogViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};


function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onPrintReport } = actions;
	if (!isSome(onPrintReport)) return null;
	let printReportRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPrintReportRender) {
			printReportRender = actionsRender.onPrintReportRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onPrintReport) && printReportRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
						label="RECONCILE.LIST.BUTTON.PRINT"
						onlyIcon={true}
						onClick={() => onPrintReport(item)}
					></BaasicButton>
				) : null}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	actionsRender: PropTypes.object,
	authorization: PropTypes.any,
};

export default defaultTemplate(DonationLogTemplate);
