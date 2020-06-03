import React from 'react';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function PayerInformationTemplate({ form, setPayerInfoUsingPrimaryDonorContactInfo, hideButton, t }) {
    return (
        <React.Fragment>
            <h3 className="u-mar--bottom--med">
                {t('CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_TITLE')}
                {!hideButton &&
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml' //TODO replace icon with better one
                        label='CONTRIBUTION.CREATE.FIELDS.USE_PRIMARY_CONTACT_INFO_LABEL'
                        onlyIcon={true}
                        onClick={() => setPayerInfoUsingPrimaryDonorContactInfo()}>
                    </BaasicButton>}
            </h3>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.name')} />
                </div>
            </div>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.addressLine1')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.addressLine2')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.city')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.state')} />
                </div>
                <div className="form__group col col-sml12 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.zipCode')} />
                </div>
            </div>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.email')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                    <BasicInput field={form.$('payerInformation.number')} />
                </div>
            </div>
        </React.Fragment>
    );
}

PayerInformationTemplate.propTypes = {
    form: PropTypes.object.isRequired,
    setPayerInfoUsingPrimaryDonorContactInfo: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    hideButton: PropTypes.bool
};

export default defaultTemplate(PayerInformationTemplate);