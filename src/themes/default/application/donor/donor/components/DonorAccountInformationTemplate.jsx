import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BasicInput,
	BaasicFieldDropdown,
	BaasicFormControls,
	EditFormContent,
	NumberFormatInputField,
	Date,
	BaasicButton,
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
	const { form, prefixTypeDropdownStore, item, isEditEnabled, onEnableEditClick } = donorAccountInformationViewStore;

	return (
		<div className="card--primary card--med">
			<EditFormContent form={form}>
				<div className="row">
					<div className="col col-sml-12 col-lrg-3">
						<h3 className=" u-mar--bottom--med">
							{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}
						</h3>
					</div>
					{isEditEnabled ? (
						<React.Fragment>
							<div className="col col-sml-12 col-lrg-12">
								<div className="card--med card--primary">
									<div className="row">
										<div className="form__group col col-sml-12 col-xlrg-2 col-xxlrg-1">
											<BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
										</div>
										<div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-3">
											<BasicInput field={form.$('firstName')} />
										</div>
										<div className="col col-sml-12 col-xlrg-5 col-xxlrg-4">
											<BasicInput field={form.$('lastName')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-12 col-xxlrg-4">
											<div>
												<label className="form__group__label">
													{t('DONOR.ACCOUNT_INFORMATION_FIELDS.DATE_OF_BIRTH')}
												</label>
												{item && (
													<span className={'input input--lrg input--text input--disabled'}>
														<Date format="full-date" value={item.dateOfBirth} />
													</span>
												)}
											</div>
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
											<BasicInput field={form.$('fundName')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
											<NumberFormatInputField field={form.$('securityPin')} />
										</div>
									</div>
								</div>
							</div>
							<div className="col col-sml-12 info-card--footer">
								<BaasicButton
									type="button"
									className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
									onClick={onEnableEditClick}
									label="Cancel"
								/>
								<BaasicFormControls form={form} onSubmit={form.onSubmit} />
							</div>
						</React.Fragment>
					) : (
						<div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
							<div className="row info-card--scale">
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Name:</p>
									<p className="type--base type--wgt--bold">
										{item ? `${item.prefixType ? item.prefixType.name : ''} ${item.firstName} ${item.lastName}` : ''}
									</p>
								</div>
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Date Of Birth:</p>
									<p className="type--base type--wgt--bold">
										{item && <Date format="full-date" value={item.dateOfBirth} />}
									</p>
								</div>
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Fund Name:</p>
									<p className="type--base type--wgt--bold">{item && item.fundName}</p>
								</div>
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Security pin:</p>
									<p className="type--base type--wgt--bold">{item && item.securityPin}</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</EditFormContent>

			<div className="row row__align--end">
				<div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
					<div className="u-separator--primary u-mar--bottom--xlrg u-mar--top--lrg"></div>
					<DonorAddressList />
					<div className="u-separator--primary u-mar--top--xlrg"></div>
				</div>
				<div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
					<DonorEmailAddressList />
					<div className="u-separator--primary u-mar--top--xlrg"></div>
				</div>
				<div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
					<DonorPhoneNumberList />
					<div className="u-separator--primary u-mar--top--xlrg"></div>
				</div>
				<div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
					<DonorBankAccountList />
					<div className="u-separator--primary u-mar--top--xlrg"></div>
				</div>
				<div className="col col-sml-12 col-lrg-12">
					<DonorAutomaticContributionSetting />
					<div className="u-separator--primary u-mar--bottom--xlrg u-mar--top--lrg"></div>
				</div>
				<div className="col col-sml-12 col-lrg-12">
					<DonorGrantFees />
				</div>
			</div>
		</div>
	);
}

DonorAccountInformationTemplate.propTypes = {
	donorAccountInformationViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(DonorAccountInformationTemplate);
