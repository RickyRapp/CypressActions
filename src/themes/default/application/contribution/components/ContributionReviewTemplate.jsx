import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicFormControls
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const ContributionReviewTemplate = function ({ contributionReviewViewStore, t }) {
    const {
        form,
        contributionStatusDropdownStore,
        item
    } = contributionReviewViewStore;

    return (
        <section className='w--400--px'>
            <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.REVIEW.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                    <div>
                        <label className="form__group__label">{t('CONTRIBUTION.REVIEW.FIELDS.DONOR_NAME_LABEL')}</label>
                        {item &&
                            <span className={"input input--med input--text input--disabled"}>{item.donorAccount.donorName}</span>}
                    </div>
                </div>
                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                    <div>
                        <label className="form__group__label">{t('CONTRIBUTION.REVIEW.FIELDS.AMOUNT_LABEL')}</label>
                        {item &&
                            <span className={"input input--med input--text input--disabled"}>${item.amount}</span>}
                    </div>
                </div>
            </div>
            <form className='form'>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BaasicFieldDropdown field={form.$('contributionStatusId')} store={contributionStatusDropdownStore} />
                    </div>
                </div>
                <div className="u-mar--bottom--med">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </form>
        </section>
    )
};

ContributionReviewTemplate.propTypes = {
    contributionReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ContributionReviewTemplate);
