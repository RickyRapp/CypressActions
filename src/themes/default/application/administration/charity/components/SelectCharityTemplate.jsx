import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicToggle } from 'core/components';

const SelectCharityTemplate = function ({ selectCharityViewStore, t }) {
    const {
        charityId,
        onClickCharityFromFilter,
        isCharity,
        setCharityToggle,
        searchCharityDropdownStore,
        displayToggle
    } = selectCharityViewStore;


    return (
        <section className="w--400--px">
            <h3 className="type--med type--wgt--medium u-mar--bottom--sml">Select Charity</h3>
            <div className="row">
                <div className="form__group col col-lrg-12">
                    {displayToggle && <BaasicToggle wrapperClassName="u-display--flex u-display--flex--column u-display--flex--align--end" showLabel={true} label={'Charity'} value={isCharity} onChange={setCharityToggle} />}
                </div>
                {charityId &&
                    <div className="form__group col col-lrg-12">
                        <a
                            className=""
                            onClick={() => onClickCharityFromFilter(charityId)}>
                            {t('SELECT_DONOR_FROM_FILTER')}
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
            </div>
        </section>
    )
};

SelectCharityTemplate.propTypes = {
    selectCharityViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SelectCharityTemplate);

