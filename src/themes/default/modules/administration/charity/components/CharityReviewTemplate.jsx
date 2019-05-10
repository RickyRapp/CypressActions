import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicDropdown, BaasicButton } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import _ from 'lodash';

function CharityReviewTemplate(
    {
        charityStatusDropdownStore,
        onReview,
        charity,
        dropdownError
    }) {

    return (
        <React.Fragment>
            {charity &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label>Charity Name</label>
                            <strong>{`${charity.name}`}</strong>
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={charity.amount}>Amount</label>
                            <strong>${charity.amount}</strong>
                        </div>
                    </div>
                </div>}

            {charityStatusDropdownStore &&
                <React.Fragment>
                    <BaasicDropdown store={charityStatusDropdownStore} />
                    {renderIf(isSome(dropdownError))(
                        <p className="type--tiny type--color--error">{dropdownError}</p>
                    )}

                    <BaasicButton
                        className="btn btn--med btn--primary display--ib"
                        label="Review"
                        onClick={() => onReview(charityStatusDropdownStore.value)}
                    />
                </React.Fragment>}
        </React.Fragment>
    );
}

export default defaultTemplate(CharityReviewTemplate);
