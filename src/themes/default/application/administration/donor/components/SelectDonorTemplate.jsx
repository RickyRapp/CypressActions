import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicToggle } from 'core/components';

const SelectDonorTemplate = function ({ selectDonorViewStore, t }) {
    const {
        donorId,
        onClickDonorFromFilter,
        selectDonorDropdownStore,
        isCharity,
        setCharityToggle
    } = selectDonorViewStore;


    return (
        <section className="w--400--px">
            <h3 className="type--med type--wgt--medium u-mar--bottom--sml">{isCharity ? 'Select Donor' : 'Select Charity'}</h3>
            <div className="row">
                {donorId &&
                    <div className="form__group col col-lrg-12">
                        <a
                            className=""
                            onClick={() => onClickDonorFromFilter(donorId)}>
                            {t('SELECT_DONOR_FROM_FILTER')}
                        </a>
                    </div>}
                {isCharity ? <div className="form__group col col-sml-9 col-lrg-12">
                    <BaasicDropdown
                        placeholder={'SELECT_DONOR_PLACEHOLDER'}
                        className='input--dropdown'
                        store={selectDonorDropdownStore}
                        opened={true}
                    />
                </div> : <div className="form__group col col-sml-9 col-lrg-12">
                    <BaasicDropdown
                        placeholder="Select charity"
                        className='input--dropdown'
                        store={selectDonorDropdownStore}
                        opened={true}
                    />
                </div>}
                <div className="form__group col col-lrg-12">
                    <BaasicToggle wrapperClassName="u-display--flex u-display--flex--column u-display--flex--align--end" showLabel={true} label={isCharity ? 'Charity' : 'Donor'} value={isCharity} onChange={setCharityToggle} />
                </div>
            </div>
        </section>
    )
};

SelectDonorTemplate.propTypes = {
    selectDonorViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SelectDonorTemplate);

