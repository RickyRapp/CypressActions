import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import {
	BaasicModal,
} from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { DonorBankAccountEdit } from 'application/administration/donor/components';
import { ContributionCreateStep1Template, ContributionCreateStep2Template, ContributionCreateStep3Template } from 'themes/application/common/contribution/components';

const ContributionCreateTemplate = function ({ store }) {
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
		onSubmitClick,
		onAddBankAccountClick,
		bankAccountNumberModal,
		onShowBankAccountNumberClick,
		...otherProps
	} = store;

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
					onSubmitClick={onSubmitClick}
					nextStep={nextStep}
					step={step}
					onSelectPaymentType={onSelectPaymentType}
					onAddBankAccountClick={onAddBankAccountClick}
					onShowBankAccountNumberClick={onShowBankAccountNumberClick}
					{...otherProps}
				/>
			)}

			{step === 3 &&
				<ContributionCreateStep3Template
					paymentType={paymentTypes.find(c => c.id === form.$('paymentTypeId').value)}
					routes={routes}
					previousContributionsTableStore={previousContributionsTableStore}
					bankAccount={bankAccountDropdownStore && bankAccountDropdownStore.items.find(c => c.id === form.$('bankAccountId').value)}
					form={form} />}
			<BaasicModal modalParams={bankAccountModal}>
				<DonorBankAccountEdit />
			</BaasicModal>
			<BaasicModal modalParams={bankAccountNumberModal}>
				<div>{bankAccountNumberModal && bankAccountNumberModal.data && bankAccountNumberModal.data.accountNumber}</div>
			</BaasicModal>
		</Page>
	);
};

ContributionCreateTemplate.propTypes = {
	store: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionCreateTemplate);
