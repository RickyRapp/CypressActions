import React from 'react';
import { defaultTemplate } from 'core/utils'
import { BasicInput, BasicTextArea, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown, BasicFieldDatePicker } from 'core/components';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip'

function GrantScheduledPaymentCreateFormTemplate(
    {
        createViewStore: {
            grantScheduleTypeDropdownStore,
            onStartFutureDateChange,
            monthlyId,
            annualId,
            isFutureGrant,
            form },
        t }
) {

    const scheduleGrantTooltip =
        <React.Fragment>
            <span className='icomoon icon-question-circle' data-tip data-for={'scheduledGrant'} />
            <ReactTooltip type='info' effect='solid' place="right" id={'scheduledGrant'}>
                <span>{t('GRANTCREATEEDITFORM.SCHEDULENAMETOOLTIP')}</span>
            </ReactTooltip>
        </React.Fragment>

    return (
        <div className="f-row">
            {grantScheduleTypeDropdownStore &&
                <div className="form__group f-col f-col-lrg-6">
                    <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                </div>}

            {form.$('grantScheduleTypeId').value &&
                <React.Fragment>
                    <div className="form__group f-col f-col-lrg-6">
                        <BasicFieldDatePicker
                            field={form.$('startFutureDate')}
                            before={new Date()}
                            after={form.$('endDate').value !== '' ? form.$('endDate').value : null}
                            todayButton={t('TODAY')}
                            onChange={onStartFutureDateChange}
                        />
                    </div>

                    {isFutureGrant &&
                        <div className="form__group f-col f-col-lrg-12">
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicInput field={form.$('name')} tooltip={scheduleGrantTooltip} />
                                </div>
                                {(form.$('grantScheduleTypeId').value === monthlyId || form.$('grantScheduleTypeId').value === annualId) &&
                                    <div className="form__group f-col f-col-lrg-12">
                                        <div className="f-row">
                                            {!(form.$('noEndDate').value && form.$('noEndDate').value === true) && !(form.$('numberOfPayments').value && form.$('numberOfPayments').value !== '') &&
                                                <div className="form__group f-col f-col-lrg-4">
                                                    <BasicFieldDatePicker field={form.$('endDate')} isClearable={true} before={form.$('startFutureDate').value !== '' ? form.$('startFutureDate').value : new Date()} />
                                                </div>}

                                            {!(form.$('endDate').value && form.$('endDate').value !== '') && !(form.$('numberOfPayments').value && form.$('numberOfPayments').value !== '') &&
                                                <div className="form__group f-col f-col-lrg-4">
                                                    <BasicCheckBox field={form.$('noEndDate')} />
                                                </div>}

                                            {!(form.$('noEndDate').value && form.$('noEndDate').value === true) && !(form.$('endDate').value && form.$('endDate').value !== '') &&
                                                <div className="form__group f-col f-col-lrg-4">
                                                    <BasicInput field={form.$('numberOfPayments')} />
                                                </div>}
                                        </div>
                                    </div>}
                            </div>
                        </div>}
                </React.Fragment>}
        </div>
    )
};


export default defaultTemplate(GrantScheduledPaymentCreateFormTemplate);