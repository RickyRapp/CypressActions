import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicFieldDropdown, BaasicButton, BasicInput } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { Loader } from 'core/components';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

function GrantReviewTemplate({ grantReviewViewStore }) {
    const {
        loaderStore,
        paymentTypeDropdownStore,
        item,
        checkId,
        grantPurposeTypes,
        form
    } = grantReviewViewStore;


    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}

            {item &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Charity Name</label>
                                <strong>{item.charity.name}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Amount</label>
                                <strong>
                                    <NumberFormat
                                        value={_.sumBy(item.grants, 'amount')}
                                        displayType={'text'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        thousandSeparator={true}
                                        prefix={'$'} />
                                </strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Date Created</label>
                                <strong>{new Date(item.dateCreated).toLocaleDateString()}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Description</label>
                                <strong>{item.description}</strong>
                            </div>
                        </div>
                    </div>

                    {paymentTypeDropdownStore &&
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-6">
                                <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                            </div>
                            <div className="form__group f-col f-col-lrg-6">
                                <BasicInput field={form.$('paymentNumber')} />
                            </div>

                            {form.$('paymentTypeId').value === checkId &&
                                <React.Fragment>
                                    <div className="form__group f-col f-col-lrg-12">
                                        <BasicInput field={form.$('attOf')} />
                                    </div>
                                    <AddressTemplate field={form.$('recipientAddress')} />
                                </React.Fragment>}
                        </div>}

                    <BaasicButton
                        className="btn btn--med btn--primary display--ib"
                        label="Review"
                        onClick={form.onSubmit}
                    />
                </React.Fragment>}

        </React.Fragment>
    );
}

export default defaultTemplate(GrantReviewTemplate);
