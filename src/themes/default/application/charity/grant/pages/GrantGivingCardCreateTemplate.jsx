import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BasicInput, NumberFormatInputField, NumericInputField } from 'core/components';

function GrantGivingCardCreateTemplate({ grantGivingCardCreateViewStore, t }) {
	const { form, contentLoading } = grantGivingCardCreateViewStore;

	return (
		<ApplicationEditLayout store={grantGivingCardCreateViewStore}>
			<Content loading={contentLoading}>
				<h3 className=" u-mar--bottom--med">{t('CHARITY_GIVING_CARD.CREATE.TITLE')}</h3>
				<div className="card--med card--primary">
					<div className="row">
						<div className="form__group col col-sml-12 col-lrg-6">
							<NumericInputField field={form.$('amount')} />
						</div>
						<div className="form__group col col-sml-12 col-lrg-6">
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
					</div>
				</div>
			</Content>
		</ApplicationEditLayout>
	);
}

GrantGivingCardCreateTemplate.propTypes = {
	grantGivingCardCreateViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(GrantGivingCardCreateTemplate);
