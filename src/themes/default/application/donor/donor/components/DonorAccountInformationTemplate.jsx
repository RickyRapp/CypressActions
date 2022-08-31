import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import moment from 'moment';
import {
	BasicInput,
	BaasicFieldDropdown,
	BaasicFormControls,
	EditFormContent,
	NumberFormatInputField,
	Date,
	BaasicButton,
	NumericInputField,
} from 'core/components';
import {
	DonorAddressList,
	DonorEmailAddressList,
	DonorPhoneNumberList,
	DonorBankAccountList,
	DonorAutomaticContributionSetting,
	DonorGrantFees,
} from 'application/donor/donor/components';

function DonorAccountInformationTemplate({ donorAccountInformationViewStore, t }) {
	const {
		form,
		monthDropdownStore,
		prefixTypeDropdownStore,
		onEnableEditClick,
		isEditEnabled,
		item,
	} = donorAccountInformationViewStore;

	return (
		<div className="">
			<EditFormContent form={form}>
				<div className="card--primary card--med">
					<div>
						<div >
							<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}</h3>
						</div>
						{isEditEnabled ? (
							<div className="card--primary card--med">
								<div className="row row--form">
									<div className="form__group col col-sml-12 col-xlrg-4">
										<BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
									</div>
									<div className="form__group col col-sml-12 col-xlrg-4">
										<BasicInput field={form.$('firstName')} />
									</div>
									<div className="col col-sml-12 col-xlrg-4">
										<BasicInput field={form.$('lastName')} />
									</div>
									{/* <div className="col col-sml-12 col-lrg-12">
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
									<div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
										<BasicInput field={form.$('fundName')} />
									</div>
									<div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
										<NumberFormatInputField field={form.$('securityPin')} />
									</div>
								</div>
								<div className="info-card--footer">
									<BaasicButton
										type="button"
										className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
										onClick={onEnableEditClick}
										label="Cancel"
									/>
									<BaasicFormControls form={form} onSubmit={form.onSubmit} />
								</div>
							</div>
						) : (
							<div title="Click to edit" onClick={onEnableEditClick}>
								<div className="info-card--scale">
									<div className="row">
										<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Name:</p>
											<p className="type--base type--wgt--bold">
												{item
													? `${item.prefixType ? item.prefixType.name : ''} ${item.firstName} ${item.lastName}`
													: ''}
											</p>
										</div>
										<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
												Date Of Birth:
											</p>
											<p className="type--base type--wgt--bold">
												{item && <Date format="short" value={moment(item.dateOfBirth).utcOffset(1)} />}
											</p>
										</div>
										<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Fund Name:</p>
											<p className="type--base type--wgt--bold">{item && item.fundName}</p>
										</div>
										<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
												Security pin:
											</p>
											<p className="type--base type--wgt--bold">{item && item.securityPin}</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</EditFormContent>

			<DonorAddressList />
			<DonorEmailAddressList />
			<DonorPhoneNumberList />
			<DonorBankAccountList />
			<DonorAutomaticContributionSetting />
			<DonorGrantFees />
		</div>
	);
}

DonorAccountInformationTemplate.propTypes = {
	donorAccountInformationViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(DonorAccountInformationTemplate);
