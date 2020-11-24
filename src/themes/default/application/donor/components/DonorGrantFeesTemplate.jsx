import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls,
    BasicFieldCheckbox
} from 'core/components'

const DonorGrantFeesTemplate = function ({ t, donorGrantFeesViewStore }) {
    const {
        loaderStore,
        form,
    } = donorGrantFeesViewStore;

    return (
        <EditFormContent form={form} loading={loaderStore.loading}>
            <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.GRANT_FEES.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-2">
                    Online are free!
                </div>
                <div className="form__group col col-sml-12 col-lrg-2">
                    <BasicFieldCheckbox field={form.$('isGrantRequestFeePayedByCharity')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-2">
                    <BasicFieldCheckbox field={form.$('isCharityWebsiteFeePayedByCharity')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-2">
                    <BasicFieldCheckbox field={form.$('isGivingCardFeePayedByCharity')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-2">
                    <BasicFieldCheckbox field={form.$('isSessionFeePayedByCharity')} />
                </div>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    )
}

DonorGrantFeesTemplate.propTypes = {
    donorGrantFeesViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGrantFeesTemplate);
