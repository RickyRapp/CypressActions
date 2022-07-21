import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicToggle } from 'core/components';

const SelectDonorTemplate = function ({ selectDonorViewStore, t }) {
    const {
        donorId,
        onClickDonorFromFilter,
        onClickCharityFromFilter,
        selectDonorDropdownStore,
        isCharity,
        setCharityToggle,
        searchCharityDropdownStore,
        displayToggle,
        charityId
    } = selectDonorViewStore;


    return (
        <section className="w--400--px">
            <h3 className="type--med type--wgt--medium u-mar--bottom--sml">{!isCharity ? 'Select Donor' : 'Select Charity'}</h3>
            <div className="row">
                <div className="form__group col col-lrg-12">
                    {displayToggle && <BaasicToggle wrapperClassName="u-display--flex u-display--flex--column u-display--flex--align--end" showLabel={true} label={!isCharity ? 'Charity' : 'Donor'} value={isCharity} onChange={setCharityToggle} />}
                </div>
              
                {!isCharity ? <React.Fragment>
                    {donorId &&
                    <div className="form__group col col-lrg-12">
                        <a
                            className=""
                            onClick={() => onClickDonorFromFilter(donorId)}>
                            {t('SELECT_DONOR_FROM_FILTER')}
                        </a>
                    </div>}
                <div className="form__group col col-sml-9 col-lrg-12">
                    <BaasicDropdown
                        placeholder={'SELECT_DONOR_PLACEHOLDER'}
                        className='input--dropdown'
                        store={selectDonorDropdownStore}
                        opened={true}
                    />
                </div>
                </React.Fragment>
                    : 
                    <React.Fragment>
                          {charityId &&
                        <div className="form__group col col-lrg-12">
                            <a
                                className=""
                                onClick={() => onClickCharityFromFilter(charityId)}>
                                {t('SELECT_CHARITY_FROM_FILTER')}
                            </a>
                        </div>}
                        <div className="form__group col col-sml-9 col-lrg-12">
                    <BaasicDropdown
                        placeholder="Select charity"
                        className='input--dropdown'
                        store={searchCharityDropdownStore}
                        opened={true}
                    />
                </div>
                    </React.Fragment>
                  }

            </div>
        </section>
    )
};

SelectDonorTemplate.propTypes = {
    selectDonorViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SelectDonorTemplate);

