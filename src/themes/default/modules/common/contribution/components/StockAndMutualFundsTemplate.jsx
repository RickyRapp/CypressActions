import React from 'react';
import { BasicInput } from 'core/components';

function StockAndMutualFundsTemplate({ form, showStockAndMutualFundsContactInfo, onChangeShowStockAndMutualFundsContactInfo }) {
    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <BasicInput field={form.$('financialInstitution')} />
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <div className="display--b pull">{showStockAndMutualFundsContactInfo ? 'Hide' : 'Show'} institution contact informations</div>
                    <div className="display--b pull spc--left--sml">
                        <input type="checkbox" onChange={onChangeShowStockAndMutualFundsContactInfo} value={showStockAndMutualFundsContactInfo} />
                    </div>
                </div>
                {showStockAndMutualFundsContactInfo &&
                    <div className="card card--sml">
                        <div className="form__group f-col f-col-lrg-6">
                            <BasicInput field={form.$('financialInstitutionAddressLine1')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <BasicInput field={form.$('financialInstitutionAddressLine2')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('financialInstitutionCity')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('financialInstitutionState')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('financialInstitutionZipCode')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-4">
                            <BasicInput field={form.$('financialInstitutionPhoneNumber')} />
                        </div>
                    </div>}
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('accountNumber')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('securityType')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('securitySymbol')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('numberOfShares')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('estimatedValue')} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default StockAndMutualFundsTemplate;


