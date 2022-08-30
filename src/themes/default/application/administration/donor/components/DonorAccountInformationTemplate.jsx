import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BasicInput,
	BaasicFieldDropdown,
	BaasicFormControls,
	EditFormContent,
	NumberFormatInputField,
	NumericInputField,
} from 'core/components';
import {
	DonorAddressList,
	DonorEmailAddressList,
	DonorPhoneNumberList,
	DonorBankAccountList,
	DonorAutomaticContributionSetting,
	DonorGrantFees,
	DonorAccountSetting,
} from 'application/administration/donor/components';

function DonorAccountInformationTemplate({ donorAccountInformationViewStore, t }) {
	const {
		form,
		prefixTypeDropdownStore,
		item,
		accountManagerDropdownStore,
		monthDropdownStore,
	} = donorAccountInformationViewStore;

	window.scrollTo(0, 0);

	return (
		<div className="">
			<EditFormContent form={form}>
				<div className="container--sidebar">
					<div className="card--primary card--med u-mar--bottom--sml">
						<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}</h3>
						<div className="row row--form">
							<div className="form__group col col-sml-12 col-lrg-4">
								<BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-4">
								<BasicInput field={form.$('firstName')} />
							</div>
							<div className="col col-sml-12 col-lrg-4">
								<BasicInput field={form.$('lastName')} />
							</div>
							{/* <div className="col col-sml-12 col-lrg-12 u-mar--bottom--sml type--right">
								<label className="form__group__label">Date of Birth</label>
							</div> */}
							<div className="form__group col col-sml-12 col-lrg-4">
								<BaasicFieldDropdown store={monthDropdownStore} field={form.$('month')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-4">
								<NumericInputField field={form.$('day')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-4">
								<NumericInputField
									field={form.$('year')}
									formatOptions={{
										style: 'decimal',
										useGrouping: false,
									}}
								/>
							</div>

							<div className="form__group col col-sml-12 col-lrg-4">
								<BasicInput field={form.$('fundName')} />
							</div>
							<div className="form__group col col-sml-12 col-lrg-4 ">
								<NumberFormatInputField field={form.$('securityPin')} />
							</div>
							{item && item.accountType.abrv === 'private' && (
								<div className="col col-sml-12 col-xlrg-4">
									<BaasicFieldDropdown field={form.$('accountManagerId')} store={accountManagerDropdownStore} />
								</div>
							)}
						</div>

						<div className="type--right">
							<BaasicFormControls form={form} onSubmit={form.onSubmit} />
						</div>
					</div>

					<div>
						<div className="card--primary card--med">
							<DonorAccountSetting />
						</div>
					</div>
				</div>
			</EditFormContent>

			<div className="card--primary card--med u-mar--bottom--med">
				<div className="u-mar--bottom--lrg">
					<DonorAddressList />
				</div>

				<div className="u-mar--bottom--lrg">
					<DonorEmailAddressList />
				</div>

				<div className="u-mar--bottom--lrg">
					<DonorPhoneNumberList />
				</div>

				<div className="u-mar--bottom--lrg">
					<DonorBankAccountList />
				</div>
			</div>

			<div className="card--primary card--med u-mar--bottom--lrg">
				<DonorAutomaticContributionSetting />
			</div>

			<div className="card--primary card--med u-mar--bottom--lrg">
				<DonorGrantFees />
			</div>
		</div>
	);
}

DonorAccountInformationTemplate.propTypes = {
	donorAccountInformationViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	rootStore: PropTypes.object.isRequired,
};

export default defaultTemplate(DonorAccountInformationTemplate);
