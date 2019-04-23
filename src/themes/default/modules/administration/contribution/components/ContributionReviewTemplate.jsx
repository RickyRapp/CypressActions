import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicDropdown, BaasicButton } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import _ from 'lodash';

function ContributionReviewTemplate(
    {
        contributionStatusDropdownStore,
        onReview,
        contribution,
        dropdownError
    }) {

    return (
        <React.Fragment>
            {contribution &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={contribution.donorAccount.coreUser.firstName}>Donor Name</label>
                            <strong>{`${contribution.donorAccount.coreUser.firstName} ${contribution.donorAccount.coreUser.lastName}`}</strong>
                        </div>
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="inputgroup">
                            <label htmlFor={contribution.amount}>Amount</label>
                            <strong>${contribution.amount}</strong>
                        </div>
                    </div>
                </div>}

            {contributionStatusDropdownStore &&
                <React.Fragment>
                    <BaasicDropdown store={contributionStatusDropdownStore} />
                    {renderIf(isSome(dropdownError))(
                        <p className="type--tiny type--color--error">{dropdownError}</p>
                    )}

                    <BaasicButton
                        className="btn btn--med btn--primary display--ib"
                        label="Review"
                        onClick={() => onReview(contributionStatusDropdownStore.value)}
                    />
                </React.Fragment>}
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionReviewTemplate);
