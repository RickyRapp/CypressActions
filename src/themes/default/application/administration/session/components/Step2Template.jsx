import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton, NumberFormatInputField } from 'core/components';
import AsyncSelect from 'react-select/async';
function Step2Template({ form, onPreviousStepClick, onNextStepClick, charityDropdownStore, isChangedDefaultAddress, onChangeDefaultAddressClick, filterCharities, setCharityId }) {
    const promiseOptions = inputValue =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterCharities(inputValue));
        }, 1000);
    });

	return (
		<React.Fragment>
			<div className="scanner card--med">
				{/* <h3 className=" u-mar--bottom--med u-mar--left--sml">General Data</h3> */}
				<div className="row row--form">
					<div className="col col-sml-12 u-mar--bottom--med">
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<BasicInput field={form.$('fullName')} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							<NumberFormatInputField field={form.$('phoneNumber')} />
						</div>
						<div className="col col-sml-12 u-mar--bottom--lrg">
							{/* <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} /> */}
							<AsyncSelect onChange={e => setCharityId(e.value)} cacheOptions defaultOptions loadOptions={promiseOptions} />
							{charityDropdownStore && charityDropdownStore.value &&
								<BaasicButton
									className="btn btn--sml btn--link u-mar--bottom--sml"
									label={isChangedDefaultAddress ? 'SESSION.CREATE.STEP2.BUTTONS.SET_DEFAULT_DEFAULT_ADDRESS' : 'SESSION.CREATE.STEP2.BUTTONS.CHANGE_DEFAULT_ADDRESS'}
									onClick={onChangeDefaultAddressClick}>
								</BaasicButton>}
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
};

export default defaultTemplate(Step2Template);
