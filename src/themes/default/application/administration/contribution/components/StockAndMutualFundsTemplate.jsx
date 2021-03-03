import React from 'react';
import { BasicInput } from 'core/components';
import PropTypes from 'prop-types';

function StockAndMutualFundsTemplate({ form }) {
    return (
        <React.Fragment>
            <div className="row row--form">
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitution')} />
                </div>
            </div>
            <div className="row row--form">
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionAddressLine1')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionAddressLine2')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionCity')} />
                </div>
                <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionState')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionZipCode')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('financialInstitutionPhoneNumber')} />
                </div>
            </div>
            <div className="row row--form">
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('accountNumber')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('securityType')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('securitySymbol')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('numberOfShares')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                    <BasicInput field={form.$('estimatedValue')} />
                </div>
            </div>
        </React.Fragment>
    );
}

StockAndMutualFundsTemplate.propTypes = {
    form: PropTypes.object.isRequired
};

export default StockAndMutualFundsTemplate;