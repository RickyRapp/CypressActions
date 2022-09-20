import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	ApplicationEmptyState,
	EditFormContent,
	BaasicFormControls,
	BasicTextArea,
	BaasicButton,
} from 'core/components';

const CharityDescriptionTemplate = function ({ t, charityDescriptionViewStore }) {
	const { form, item, isEditEnabled, onEnableEditClick } = charityDescriptionViewStore;

	return (
		<div className="card--primary card--med u-mar--bottom--med">
			<EditFormContent form={form} formClassName={" "}>
				<div className="card--primary__header">
					<h3 className="u-mar--bottom--med">{t('CHARITY.DESCRIPTION.TITLE')}</h3>
				</div>
				{isEditEnabled ? (
					<React.Fragment>
						<div className="card--primary__body">
							<BasicTextArea field={form.$('description')} />
						</div>

						<div className="card--primary__footer">
							{/* <BaasicButton
								type="button"
								className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
								onClick={onEnableEditClick}
								label="Cancel"
							/> */}
							<BaasicFormControls form={form} onSubmit={form.onSubmit} />
						</div>
					</React.Fragment>
				) : (
					<div className="card--med cursor--pointer" title="Click to edit" onClick={onEnableEditClick}>
						<div className="row info-card--scale">
							<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
								<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Description:</p>
								<p className="type--base type--wgt--bold">{item && item.description}</p>
							</div>
						</div>
					</div>
				)}
			</EditFormContent>
		</div>
	);
};

CharityDescriptionTemplate.propTypes = {
	charityDescriptionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(CharityDescriptionTemplate);
