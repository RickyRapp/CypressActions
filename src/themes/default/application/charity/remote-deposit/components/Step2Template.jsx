import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton, NumericInputField } from 'core/components';

function Step2Template({ form, onPreviousStepClick, onNextStepClick, isChangedDefaultAddress, charityName, charityAddress, taxId, phoneNumber, paymentMethod }) {
	return (
		<React.Fragment>
			<div className="card--primary card--med">
				<div className="row row--form">
					<div className="col col-sml-12 u-mar--bottom--med">
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BasicInput field={form.$('fullName')} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							{<p>Charity name: <b>{charityName}</b> <br/>
								EIN: <b>{taxId} </b> <br/>
								{charityAddress} <br/>
								{phoneNumber} <br/> <br/>
								Payment method: <b> {paymentMethod} </b>
							 </p> }
							{isChangedDefaultAddress &&
								<div className="card--secondary card--med u-mar--bottom--sml">
									<div className="row">
										<div className="form__group col col-sml-12">
											<BasicInput field={form.$('addressLine1')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('addressLine2')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('city')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('state')} />
										</div>
										<div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
											<BasicInput field={form.$('zipCode')} />
										</div>
									</div>
								</div>}
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BasicInput field={form.$('description')} />
						</div>

						<div className="form__group col col-sml-12 u-mar--bottom--sml">
							<NumericInputField field={form.$('checkCount')} />
						</div>
						<div className="form__group col col-sml-12 u-mar--bottom--lrg">
							<NumericInputField field={form.$('estimatedAmount')} />
						</div>
						
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<p className="type--med type--wgt--regular type--color--opaque u-mar--bottom--med">
								To receive a report of this session please enter your email address bellow:
							</p>
							<BasicInput field={form.$('email')} />
						</div>
						<div className="col col-sml-12">
							<div className="scanner__footer">
								<BaasicButton
									className="btn btn--med btn--med--100 btn--primary u-mar--right--sml"
									classNameExtend="u-display--flex--justify--center"
									onClick={onPreviousStepClick}
									label="SESSION.CREATE.STEP2.BUTTONS.BACK"
									/>
								<BaasicButton
									className="btn btn--med btn--med--100 btn--secondary"
									classNameExtend="u-display--flex--justify--center"
									onClick={onNextStepClick}
									label="SESSION.CREATE.STEP2.BUTTONS.SAVE"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

Step2Template.propTypes = {
	form: PropTypes.object.isRequired,
	onPreviousStepClick: PropTypes.func.isRequired,
	onNextStepClick: PropTypes.func.isRequired,
	charityDropdownStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	isChangedDefaultAddress: PropTypes.bool,
	onChangeDefaultAddressClick: PropTypes.func,
	filterCharities: PropTypes.func,
	setCharityId: PropTypes.func,
	isCharitySelected: PropTypes.bool
};

export default defaultTemplate(Step2Template);
