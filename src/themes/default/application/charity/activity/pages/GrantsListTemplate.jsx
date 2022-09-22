import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	BaasicModal,
	DateRangeQueryPicker,
	NumberFormatInput,
	BaasicButton,
} from 'core/components';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';
import { isSome } from 'core/utils';

const GrantListTemplate = function ({ grantsViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		donationStatusDropdownStore,
		selectDonorModal,
		donationTypeDropdownStore,
		dateCreatedDateRangeQueryStore,
	} = grantsViewStore;
 
	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<TableFilter colClassName={"u-mar--bottom--sml"} queryUtility={queryUtility}>
					<div className="row">
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown store={searchDonorDropdownStore} />
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="confirmationNumber"
								className="input input--lrg"
								value={queryUtility.filter.confirmationNumber || ''}
								onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
								placeholder="GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<NumberFormatInput
								className="input input--lrg"
								value={queryUtility.filter.bookletCertificateCode}
								onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
								format="######-##"
								placeholder="Check Number"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="dollarRange"
								className="input input--lrg"
								value={queryUtility.filter.dollarRange || ''}
								onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
								placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown
								store={donationStatusDropdownStore}
								placeholder="GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown
								store={donationTypeDropdownStore}
								placeholder="GRANT.LIST.FILTER.GRANT_TYPE_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="purposeNote"
								className="input input--lrg"
								value={queryUtility.filter.purposeNote || ''}
								onChange={event => (queryUtility.filter.purposeNote = event.target.value)}
								placeholder="GRANT.LIST.FILTER.INFORMATION_FROM_GRANT_PURPOSE_FIELDS"
							/>
						</div>
						<div className="col col-sml-12 col-lrg-8 u-mar--bottom--sml">
							<DateRangeQueryPicker
								queryUtility={queryUtility}
								store={dateCreatedDateRangeQueryStore}
								fromPropertyName="dateCreatedFrom"
								toPropertyName="dateCreatedTo"
							/>
						</div>
					</div>
				</TableFilter>
				
				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions}/>
			</div>

			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</Content>
	);
};

GrantListTemplate.propTypes = {
	grantsViewStore: PropTypes.object.isRequired,
	onDeclineClick: PropTypes.func,
	t: PropTypes.func,
};


function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onReview, onPreview, onCancel } = actions;
    if ( !isSome(onReview) && !isSome(onPreview) && !isSome(onCancel)) return null;

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = (item.status === 'Pending' && item.transactionType === 'deposit');
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon="u-icon u-icon--preview u-icon--base"
                        label="CONTRIBUTION.LIST.BUTTON.PREVIEW"
                        onlyIcon={true}
                        onClick={() => onPreview(item)}
                    ></BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon="u-icon u-icon--close--secondary u-icon--base"
                        label="CONTRIBUTION.LIST.BUTTON.CANCEL"
                        onlyIcon={true}
                        onClick={() => onCancel(item)}
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

export default defaultTemplate(GrantListTemplate);
