import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown } from 'core/components';

const SelectDonorTemplate = function ({ selectDonorViewStore, t }) {
    const {
        donorAccountId,
        onClickDonorFromFilter,
        selectDonorDropdownStore
    } = selectDonorViewStore;

    return (
        <section className='w--400--px'>
            <h3 className="u-mar--bottom--med">{t('SELECT_DONOR')}</h3>
            <div className="row">
                {donorAccountId &&
                    <div className="form__group col col-lrg-12">
                        <a
                            className=""
                            onClick={() => onClickDonorFromFilter(donorAccountId)}>
                            {t('SELECT_DONOR_FROM_FILTER')}
                        </a>
                    </div>}
                <div className="form__group col col-lrg-12">
                    <BaasicDropdown
                        placeholder={'SELECT_DONOR_PLACEHOLDER'}
                        className='input--dropdown'
                        store={selectDonorDropdownStore}
                        opened={true}
                    />
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

