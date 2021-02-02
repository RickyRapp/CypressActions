import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton, BaasicFieldDropdown, NumberFormatInputField } from 'core/components';

function Step2Template({ form, onPreviousStepClick, onNextStepClick, charityDropdownStore }) {
	return (
		<React.Fragment>
			<div className="scanner card--med">
				{/* <h3 className=" u-mar--bottom--med u-mar--left--sml">General Data</h3> */}
				<div className="row">
					<div className="col col-sml-12 u-mar--bottom--med">
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BasicInput field={form.$('fullName')} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<NumberFormatInputField field={form.$('phoneNumber')} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BasicInput field={form.$('description')} />
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
									onClick={onPreviousStepClick}
									label="SESSION.CREATE.STEP2.BUTTONS.BACK"
								/>
								<BaasicButton
									className="btn btn--med btn--med--100 btn--secondary"
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
};

export default defaultTemplate(Step2Template);
