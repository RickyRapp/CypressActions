import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BasicInput, NumericInputField } from 'core/components';

function GrantRequestTemplate({ grantRequestCreateViewStore, t }) {
	const { form, contentLoading } = grantRequestCreateViewStore;

	return (
		<ApplicationEditLayout store={grantRequestCreateViewStore}>
			<Content loading={contentLoading}>
				<h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('GRANT_REQUEST.CREATE.TITLE')}</h3>
				<div className="card--sml card--primary">
					<div className="row">
						<div className="form__group col col-sml-12 col-lrg-6">
							<BasicInput field={form.$('phoneNumber')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
							<NumericInputField field={form.$('amount')} />
						</div>
					</div>
				</div>
			</Content>
		</ApplicationEditLayout>
	);
}

GrantRequestTemplate.propTypes = {
	grantRequestCreateViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(GrantRequestTemplate);
