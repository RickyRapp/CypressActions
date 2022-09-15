import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicFormControls, BasicFieldCheckbox, EditFormContent, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditForm extends Component {
	render() {
		const { title, form, onCancelEditClick, isAssignableAsPrimary } = this.props;

		return (
			<EditFormContent form={form}>
				<div className="">
					<h3 className="title--secondary u-mar--bottom--med">{title}</h3>
					<div className="row row--form u-mar--bottom--sml">
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('email')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-8">
							<BasicInput field={form.$('description')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-3">
							<div className="u-display--flex">
								<label className="form__group__label u-mar--right--med">Notifications</label>
								<BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyEnabled')} /> 
								{/* disabled={form.$('isPrimary').value} */}
							</div>
						</div>
						{isAssignableAsPrimary && (
							<div className="form__group col col-sml-12 col-lrg-3">
								<div className="u-display--flex">
									<label className="form__group__label u-mar--right--med">Primary</label>
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

DonorEmailAddressEditForm.propTypes = {
	title: PropTypes.string,
	onCancelEditClick: PropTypes.func,
	form: PropTypes.object,
	t: PropTypes.func,
	isAssignableAsPrimary: PropTypes.bool,
};

export default defaultTemplate(DonorEmailAddressEditForm);
