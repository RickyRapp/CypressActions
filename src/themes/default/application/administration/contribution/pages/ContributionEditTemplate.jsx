import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import {
	BaasicModal,
} from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { DonorBankAccountEdit } from 'application/donor/donor/components';
import { ContributionCreateStep1Template, ContributionCreateStep2Template, ContributionCreateStep3Template } from 'themes/application/common/contribution/components';

const ContributionEditTemplate = function ({ contributionEditViewStore }) {
	const {
		loaderStore,
		form,
		routes,
		paymentTypes,
		step,
		onSelectPaymentType,
		bankAccountDropdownStore,
		bankAccountModal,
		previousContributionsTableStore,
		nextStep,
		...otherProps
	} = contributionEditViewStore;

	return (
		<Page loading={loaderStore.loading}>
			{step === 1 &&
				<ContributionCreateStep1Template
					paymentTypes={paymentTypes}
					paymentTypeId={form.$('paymentTypeId').value}
					onSelectPaymentType={onSelectPaymentType}
					step={step} />}

			{step === 2 && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && (
				<ContributionCreateStep2Template
					paymentType={paymentTypes.find(c => c.id === form.$('paymentTypeId').value)}
					routes={routes}
					previousContributionsTableStore={previousContributionsTableStore}
					bankAccountDropdownStore={bankAccountDropdownStore}
					form={form}
					paymentTypes={paymentTypes}
					nextStep={nextStep}
					step={step}
					onSelectPaymentType={onSelectPaymentType}
					{...otherProps}
				/>
			)}

			{step === 3 &&
				<ContributionCreateStep3Template
					paymentType={paymentTypes.find(c => c.id === form.$('paymentTypeId').value)}
					routes={routes}
					previousContributionsTableStore={previousContributionsTableStore}
					bankAccount={bankAccountDropdownStore && bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value)}
					form={form} />}
			<BaasicModal modalParams={bankAccountModal}>
				<DonorBankAccountEdit />
			</BaasicModal>
		</Page>
	);
};

ContributionEditTemplate.propTypes = {
	contributionEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionEditTemplate);
