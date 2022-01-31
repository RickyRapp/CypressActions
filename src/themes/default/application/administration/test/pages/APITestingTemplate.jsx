import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { EditFormContent, BaasicButton, BasicFieldCheckbox, NumericInputField, DatePickerField, BasicInput, BaasicFieldDropdown } from 'core/components';
import { Content } from 'core/layouts';
import moment from 'moment';

function APITestingTemplate({ apiTestingViewStore}) {
    const {
        loaderStore,
        form,
        requestTypeDropdownStore,
        sendRequest,
        validationToken,
        response,
        requestChange,
        processChange,
        url,
        grantScheduleTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        processRequestDropdownStore
    } = apiTestingViewStore;

    return (
        <Content>
            <div className="card--primary card--med u-mar--top--med">
                <div className="row">
                    <div className="col col-sml-6 col-xxlrg-6">
                        <EditFormContent form={form} 
                        loading={loaderStore.loading}
                        >
                            <h3 className=" u-mar--bottom--sml">Request body information</h3>
                            <div className="row row--form">
                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                    <BaasicFieldDropdown
                                        field={form.$('requestType')}
                                        store={requestTypeDropdownStore}
                                        onChange={requestChange()}
                                    />
                                </div>
                                {form.$('requestType').value == 1 ?
                                <React.Fragment>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('taxId')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                    <div className="form__group col col-sml-12">
                                        <DatePickerField field={form.$('startFutureDate')}/>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--sml type--color--note">
                                        <BasicFieldCheckbox field={form.$('noEndDate')} />
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--sml type--color--note">
                                        <BasicFieldCheckbox field={form.$('isRecurring')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <NumericInputField field={form.$('numberOfPayments')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BaasicFieldDropdown
                                            field={form.$('grantScheduleType')}
                                            store={grantScheduleTypeDropdownStore}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BaasicFieldDropdown
                                            field={form.$('grantPurposeType')}
                                            store={grantPurposeTypeDropdownStore}
                                        />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('purposeNote')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('donor')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('donorAuthorization')} />
                                    </div>
                                   
                                </React.Fragment>
                                : 
                                <React.Fragment>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                    <BaasicFieldDropdown
                                        field={form.$('processRequest')}
                                        store={processRequestDropdownStore}
                                        onChange={processChange()}
                                    />
                                     </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('taxId')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('cardNumber')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('description')} />
                                    </div>
                                </React.Fragment>
                                }
                            </div>
                            <div className="row">
                            <div className="col col-sml-12 col-xxlrg-2 type--right">
                                <BaasicButton
                                    className="btn btn--med btn--primary"
                                    label={'Send Request'}
                                    onClick={() => sendRequest()}
                                />
                            </div>
                            </div>
                        </EditFormContent>
                    </div>
                    <div className="col col-sml-6 col-xxlrg-6">
                        <div className="row">
                            <div className="card--secondary card--med col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                <div className="row row--form">
                                    <div className="col col-sml-12 col-lrg-6">
                                        <h4 className=" u-mar--bottom--med">Request</h4>
                                        
                                    </div>
                                </div>
                                <div className="row row--form u-padd--top--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="u-separator--primary u-mar--bottom--sml"></div>
                                        <strong>URL</strong>
                                        <p>{url}</p>
                                    </div>
                                </div>
                                <div className="row row--form u-padd--top--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="u-separator--primary u-mar--bottom--sml"></div>
                                        <strong>Method</strong>
                                        <p>POST</p>
                                    </div>
                                </div>
                                <div className="row row--form u-padd--top--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="u-separator--primary u-mar--bottom--sml"></div>
                                        <strong>Headers:</strong>
                                        <p>"Validation-Token": {validationToken}</p>
                                    </div>
                                </div>
                                <div className="row row--form u-padd--top--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="u-separator--primary u-mar--bottom--sml"></div>
                                        <strong>Body:</strong>
                                        <p>{"{"}</p>
                                        {form.$('requestType').value == 1 ?
                                        <React.Fragment>
                                            <p>"taxId": "{form.$('taxId').value}",</p>
                                            <p>"amount": {form.$('amount').value},</p>
                                            <p>"startFutureDate":"{moment(form.$('startFutureDate').$value).format('YYYY-MM-DD')}",</p>
                                            <p>"noEndDate": {form.$('noEndDate').value ? 'true': 'false'},</p>
                                            <p>"numberOfPayments": {form.$('numberOfPayments').value},</p>
                                            <p>"grantScheduleType": "{grantScheduleTypeDropdownStore.value && grantScheduleTypeDropdownStore.value.abrv}",</p>
                                            <p>"grantPurposeType": "{grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.abrv}",</p>
                                            <p>"purposeNote": "{form.$('purposeNote').value}",</p>
                                            <p>"donor": "{form.$('donor').value}",</p>
                                            <p>"donorAuthorization": "{form.$('donorAuthorization').value}",</p>
                                            <p>"IsRecurring": {form.$('isRecurring').value ? 'true': 'false'}</p>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <p>"taxId": "{form.$('taxId').value}",</p>
                                            <p>"amount": {form.$('amount').value},</p>
                                            <p>"cardNumber": {form.$('cardNumber').value},</p>
                                            <p>"description": {form.$('description').value}</p>
                                        </React.Fragment>}
                                        <p>{"}"}</p>
                                    </div>
                                </div>
                                {response != null ?
                                <div className="row row--form u-padd--top--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="u-separator--primary u-mar--bottom--sml"></div>
                                        <strong>Response:</strong>
                                        <p>{"{"}</p>
                                        {response.isSuccess ?
                                        <React.Fragment>
                                            <p>"Response message": "{response.msg}"</p>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <p>"Response Error Message": "{response.error}",</p>
                                            <p>"Response Error Code": {response.errorCode}</p>
                                        </React.Fragment>}
                                        <p>{"}"}</p>
                                    </div>
                                </div>
                                : '' }
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        </Content >
    )
}

APITestingTemplate.propTypes = {
    apiTestingViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onClick } = actions;
    if (!isSome(onClick)) return null;

    return (
        <td>
            <div className="type--right">
                
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
                        label='TEST.API_TESTING'
                        onlyIcon={true}
                        onClick={() => onClick(item.abrv)}>
                    </BaasicButton>
               
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
};

export default defaultTemplate(APITestingTemplate);
