import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicCheckBox } from 'core/components';

function DonorAccountSettingsAdministrationEdit({ form, basic }) {

    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('lineOfCredit')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicCheckBox field={form.$('initialContribution')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('contributionMinimumInitial')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('contributionMinimumAdditional')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('grantMinimumAmount')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('grantFee')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('certificateDeduction')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('certificateFee')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('extraBookletPercentage')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('blankBookletMax')} />
            </div>

            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={form.$('notificationLimitRemainderAmount')} />
            </div>
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountSettingsAdministrationEdit);
