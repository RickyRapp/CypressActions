import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicFormControls, BasicFieldCheckbox, EditFormContent, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditForm extends Component {
	render() {
		const { title, form, onCancelEditClick, isAssignableAsPrimary } = this.props;

		return (
			<EditFormContent form={form}>
				<div className="card--med card--primary">
					<h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
					<div className="row u-mar--bottom--sml">
						<div className="form__group col col-sml-12 col-lrg-4">
							<BasicInput field={form.$('email')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-8">
							<BasicInput field={form.$('description')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-2">
							<BasicFieldCheckbox field={form.$('isNotifyEnabled')} disabled={form.$('isPrimary').value} />
						</div>
						{isAssignableAsPrimary && (
							<div className="form__group col col-sml-12 col-lrg-2">
								<BasicFieldCheckbox field={form.$('isPrimary')} />
							</div>
						)}
					</div>
				</div>
				<div className="col col-sml-12 type--right u-mar--top--sml">
					<BaasicButton
						type="button"
						className="btn btn--med btn--ghost u-mar--right--sml"
						onClick={onCancelEditClick}
						label="Cancel"
					/>
					<BaasicFormControls form={form} onSubmit={form.onSubmit} className="btn btn--med btn--secondary" />
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
};

export default defaultTemplate(DonorEmailAddressEditForm);
