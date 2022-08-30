import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { 
	BaasicFieldDropdown,
	BaasicFieldToggle,
	BasicInput, 
	DatePickerField, 
	FormatterResolver,
	NumberFormatInputField,
	NumericInputField,
	BaasicButton 
} from 'core/components';

function GrantGivingCardCreateTemplate({ grantGivingCardCreateViewStore, t }) {
	const { 
		form,
		contentLoading, 
		getNumberOfReocurrency, 
		grantScheduleTypeDropdownStore 
	} = grantGivingCardCreateViewStore;

	return (
		<React.Fragment>
		<EditFormLayout store={grantGivingCardCreateViewStore} layoutFooterVisible={false} >
			<Content loading={contentLoading}>
				<div className="card--med card--primary">
					<div className="row row--form">
						<div className="form__group col col-sml-12 col-lrg-12">
							<NumericInputField field={form.$('amount')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-12">
							<NumberFormatInputField field={form.$('cardNumber')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<NumberFormatInputField field={form.$('expirationDate')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<NumberFormatInputField field={form.$('cvv')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('note')} />
						</div>
						{window.innerWidth > 750 && (form.$('isRecurring').value !== true && (
							<div className={`form__group col col-sml-12 col-xxxlrg-6`}>
							<DatePickerField field={form.$('startFutureDate')} />
							</div>
						))}
						
					</div>
					<div className="row row--form">
							<div className="form__group col col-sml-12 type--color--note u-mar--bottom--sml">
								<BaasicFieldToggle field={form.$('isRecurring')} showLabel={true} />
							</div>
						</div>
						{form.$('isRecurring').value &&
							<div className="card--form card--med u-mar--bottom--med">
								<div className="row row--form">
									<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
										<DatePickerField field={form.$('recurringDate')} showLabel={false} />
									</div>
									<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
										<BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} showLabel={false} />
									</div>
								</div>
								<div className="row row--form">
									<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
										<NumericInputField field={form.$('numberOfPayments')} showLabel={false} />
									</div>
									<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
										<BaasicFieldToggle field={form.$('noEndDate')} showLabel={true} />
									</div>
								</div>
								{form.$('amount').value && form.$('noEndDate').value === false && (form.$('numberOfPayments').value || form.$('endDate').value) &&
									<div className="row">
										<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
											Accumulated amount:
											{form.$('numberOfPayments').value &&
												<FormatterResolver
													item={{ amount: form.$('amount').value * form.$('numberOfPayments').value }}
													field="amount"
													format={{ type: 'currency' }}
												/>}
											{form.$('endDate').value &&
												<FormatterResolver
													item={{ amount: form.$('amount').value * getNumberOfReocurrency(form.$('recurringDate').value, form.$('endDate').value, form.$('grantScheduleTypeId').value) }}
													field="amount"
													format={{ type: 'currency' }}
												/>}
										</div>
									</div>}
							</div>}
				</div>
				<div className="u-mar--top--sml u-mar--bottom--sml type--right">
					<BaasicButton className="btn btn--med btn--secondary" form={form} onClick={form.onSubmit} label='CHARITY_GIVING_CARD.CREATE.FIELDS.SUBMIT_BUTTON' />
				</div>
			</Content>		
		</EditFormLayout>
		</React.Fragment>
	);
}

GrantGivingCardCreateTemplate.propTypes = {
	grantGivingCardCreateViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(GrantGivingCardCreateTemplate);
