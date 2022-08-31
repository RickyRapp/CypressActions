import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls,
    BaasicFieldSwitch
} from 'core/components'

const DonorGrantFeesTemplate = function ({ t, donorGrantFeesViewStore }) {
    const {
        loaderStore,
        form,
    } = donorGrantFeesViewStore;

    return (
        <EditFormContent form={form} loading={loaderStore.loading}>
            <div className=" card--primary card--med u-mar--bottom--med">
                <div className="row">
                    <div className="col col-sml-12">
                        <h3 className=" u-mar--bottom--sml">{t('DONOR.GRANT_FEES.TITLE')}</h3>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-6 col-xlrg-5">
                        <span className="type--base type--wgt--bold">
                            {t('DONOR.GRANT_FEES.FIELDS.ONLINE_LABEL')}
                        </span>
                    </div>
                    <div className="form__group col col-sml-1 u-display--none--med">
                        <span className="type--base type--wgt--bold type--color--note">
                            FREE
                        </span>
                    </div>
                    <div className="form__group col col-sml-1 u-display--none--from-med"></div>
                    <div className="form__group col col-sml-1 u-display--none--from-med">
                        <span className="type--base type--wgt--bold type--color--note">
                            FREE
                        </span>
                    </div>
                    <div className="form__group col col-sml-12">
                        <BaasicFieldSwitch field={form.$('isGrantRequestFeePayedByCharity')} />
                    </div>
                    <div className="form__group col col-sml-12">
                        <BaasicFieldSwitch field={form.$('isCharityWebsiteFeePayedByCharity')} />
                    </div>
                    <div className="form__group col col-sml-12">
                        <BaasicFieldSwitch field={form.$('isGivingCardFeePayedByCharity')} />
                    </div>
                    <div className="form__group col col-sml-12">
                        <BaasicFieldSwitch field={form.$('isSessionFeePayedByCharity')} />
                    </div>
                </div>
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>
        </EditFormContent >
    )
}

DonorGrantFeesTemplate.propTypes = {
    donorGrantFeesViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGrantFeesTemplate);
