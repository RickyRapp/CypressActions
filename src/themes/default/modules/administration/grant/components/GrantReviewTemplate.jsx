import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicFieldDropdown, BaasicButton, BasicInput } from 'core/components';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { Loader } from 'core/components';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

function GrantReviewTemplate({ grantReviewViewStore }) {
    const {
        loaderStore,
        paymentTypeDropdownStore,
        grant,
        checkId,
        grantPurposeTypes,
        form
    } = grantReviewViewStore;


    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}

            {form &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Charity Name</label>
                                <strong>{`${grant.charity.name} ${grant.charity.name}`}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Donor Name</label>
                                <strong>{grant.donorAccount.donorName}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Amount</label>
                                <NumberFormat value={grant.amount} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} displayType={'text'} />
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Confirmation Number</label>
                                <strong>{grant.confirmationNumber}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Date Created</label>
                                <strong>{new Date(grant.dateCreated).toLocaleDateString()}</strong>
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Purpose</label>
                                <strong>{_.find(grantPurposeTypes, { id: grant.grantPurposeTypeId }).name}</strong>
                                {(_.find(grantPurposeTypes, { abrv: 'in-memory-of' }).id === grant.grantPurposeTypeId ||
                                    _.find(grantPurposeTypes, { abrv: 'in-honor-of' }).id === grant.grantPurposeTypeId ||
                                    _.find(grantPurposeTypes, { abrv: 'sponsor-a-friend' }).id === grant.grantPurposeTypeId) &&
                                    <React.Fragment>
                                        <span className='icomoon tiny icon-cog' data-tip data-for={'grantPurposeMember'} />
                                        <ReactTooltip type='info' effect='solid' place="right" id={'grantPurposeMember'}>
                                            <span>{grant.grantPurposeMember.firstName} {grant.grantPurposeMember.lastName}</span>
                                        </ReactTooltip>
                                    </React.Fragment>
                                }
                                {_.find(grantPurposeTypes, { abrv: 'other' }).id === grant.grantPurposeTypeId &&
                                    <React.Fragment>
                                        <span className='icomoon tiny icon-cog' data-tip data-for={'additionalInformation'} />
                                        <ReactTooltip type='info' effect='solid' place="right" id={'additionalInformation'}>
                                            <span>{grant.additionalInformation}</span>
                                        </ReactTooltip>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="inputgroup">
                                <label>Description</label>
                                <strong>{grant.description}</strong>
                            </div>
                        </div>
                    </div>

                    {paymentTypeDropdownStore &&
                        <React.Fragment>
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-6">
                                    <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                                </div>
                                <div className="form__group f-col f-col-lrg-6">
                                    <BasicInput field={form.$('paymentNumber')} />
                                </div>

                                {paymentTypeDropdownStore.value &&
                                    <React.Fragment>
                                        {paymentTypeDropdownStore.value.id === checkId &&
                                            <React.Fragment>
                                                <div className="form__group f-col f-col-lrg-12">
                                                    <BasicInput field={form.$('attOf')} />
                                                </div>
                                                <AddressTemplate field={form.$('recipientAddress')} />
                                            </React.Fragment>}
                                    </React.Fragment>
                                }
                            </div>
                        </React.Fragment>}

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
