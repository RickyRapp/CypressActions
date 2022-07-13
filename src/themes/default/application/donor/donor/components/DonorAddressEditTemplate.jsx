import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton, EditFormContent, BasicFieldCheckbox, BaasicFormControls } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditFormTemplate extends Component {
	render() {
		const { title, form, onCancelEditClick, isAssignableAsPrimary } = this.props;

		return (
			<EditFormContent form={form}>
				<div className="u-mar--bottom--med">
					<h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
					<div className="row row--form">
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('addressLine1')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('addressLine2')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('city')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('state')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('zipCode')} />
						</div>
						{isAssignableAsPrimary && (
							<div className="form__group col col-sml-12 col-lrg-12">
								<div className="u-display--flex">
									<label className="form__field__label u-mar--right--med">Is Primary?</label>
									<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} />
								</div>

							</div>
						)}
					</div>
				</div>
				<div className="info-card--footer">
					<BaasicButton
						type="button"
						className="btn btn--med btn--med--wide btn--ghost"
						onClick={onCancelEditClick}
						label="Cancel"
					/>
					<BaasicFormControls form={form} onSubmit={form.onSubmit} className="btn btn--med btn--med--wide btn--secondary" />
				</div>
			</EditFormContent>
		);
	}
}

DonorEmailAddressEditFormTemplate.propTypes = {
	title: PropTypes.string,
	onCancelEditClick: PropTypes.func,
	form: PropTypes.object,
	t: PropTypes.func,
	isAssignableAsPrimary: PropTypes.bool,
};

export default defaultTemplate(DonorEmailAddressEditFormTemplate);
