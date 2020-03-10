import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicFormControls,
    FormatterResolver
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const ContributionReviewTemplate = function ({ contributionReviewViewStore, t }) {
    const {
        form,
        contributionStatusDropdownStore,
        item
    } = contributionReviewViewStore;

    return (
        <section className="w--400--px">
            <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.REVIEW.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div className="form__group__label">{t('CONTRIBUTION.REVIEW.FIELDS.DONOR_NAME_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.donorAccount.donorName}
                    </span>
                </div>
                <div className="form__group col col-lrg-6">
                    <div className="form__group__label">{t('CONTRIBUTION.REVIEW.FIELDS.AMOUNT_LABEL')}</div>
                    <span className="input--preview">
                        {item && <FormatterResolver
                            item={{ amount: item.amount }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />}
                    </span>
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
        </section >
    )
};

ContributionReviewTemplate.propTypes = {
    contributionReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ContributionReviewTemplate);
