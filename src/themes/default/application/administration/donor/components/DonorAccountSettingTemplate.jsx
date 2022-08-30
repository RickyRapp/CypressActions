import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicFormControls, EditFormContent, NumericInputField } from 'core/components';

function DonorAccountSettingTemplate({ donorAccountSettingViewStore, t }) {
	const { form } = donorAccountSettingViewStore;

	return (
		<EditFormContent form={form} formClassName={" "}>
			<div className="u-mar--bottom--sml">
				<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_SETTING_FIELDS.TITLE')}</h3>
				
                <div className="u-mar--bottom--sml">
					<NumericInputField field={form.$('lineOfCredit')} />
				</div>
				
                <div className="u-mar--bottom--sml">
					<NumericInputField field={form.$('blankBookletMaxAmount')} />
				</div>
			</div>

			<div className="type--right">
				<BaasicFormControls form={form} onSubmit={form.onSubmit} />
			</div>
		</EditFormContent>
	);
}

DonorAccountSettingTemplate.propTypes = {
	donorAccountSettingViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(DonorAccountSettingTemplate);
