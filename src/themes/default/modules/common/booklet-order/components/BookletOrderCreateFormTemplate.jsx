import React from 'react';
import { BaasicFieldDropdown, BasicInput, BasicCheckBox } from 'core/components';
import { BookletOrderCreateFormRowTemplate } from 'themes/modules/common/booklet-order/components';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import { defaultTemplate } from 'core/utils'

function BookletOrderCreateFormTemplate(
    {
        form,
        deliveryMethodTypeDropdownStore,
        denominationTypeDropdownStore,
        expresMailDeliveryMethodTypeId,
        totalAndFee,
        onDel,
        donorAccount,
        mostCommonDenominations,
        premiumAccountTypeId,
        t
    }) {

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    {deliveryMethodTypeDropdownStore &&
                        <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
                </div>
                {form.has('sendNotificationEmail') &&
                    <div className="form__group f-col f-col-lrg-6">
                        <BasicCheckBox field={form.$('sendNotificationEmail')} />
                        {form.$('sendNotificationEmail').value === true &&
                            <span>
                                <span className='icomoon sml icon-email-action-unread' data-tip data-for='send-notification-email' />
                                <ReactTooltip type='info' effect='solid' place="top" id='send-notification-email'>
                                    <p>Email Will Be Sent On: {_.find(donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress.email}</p>
                                </ReactTooltip>
                            </span>}
                    </div>}
            </div>

            <React.Fragment>
                {form.$('bookletOrderItems').map(item =>
                    <BookletOrderCreateFormRowTemplate
                        key={item.key}
                        form={form}
                        item={item}
                        denominationTypeDropdownStore={denominationTypeDropdownStore}
                        onDel={onDel}
                        mostCommonDenominations={mostCommonDenominations}
                    />
                )}
            </React.Fragment>

            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    {form.$('bookletOrderItems').value &&
                        <button
                            className="btn btn--sml btn--tertiary spc--top--med"
                            onClick={form.$('bookletOrderItems').onAdd}>
                            <span className="icomoon icon-add tiny align--v--baseline spc--right--tny" />
                            <span className="align--v--bottom">{t('ADDANOTHER')}</span>
                        </button>}
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-4">
                    Total: <NumberFormat value={totalAndFee.total} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
                </div>
                <div className="form__group f-col f-col-lrg-4">
                    Total With Fee: <NumberFormat value={totalAndFee.totalWithFee} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
                    {expresMailDeliveryMethodTypeId === form.$('deliveryMethodTypeId').value &&
                        <span>
                            <span className='icomoon tiny icon-alert-circle' data-tip data-for='express-mail-fee' />
                            <ReactTooltip type='info' effect='solid' place="top" id='express-mail-fee'>
                                <p>Express Mail Fee In Amount Of $25</p>
                            </ReactTooltip>
                        </span>}
                    {donorAccount && donorAccount.accountTypeId === premiumAccountTypeId &&
                        <span>
                            <span className='icomoon tiny icon-question-circle' data-tip data-for='premium-fee' />
                            <ReactTooltip type='info' effect='solid' place="top" id='premium-fee'>
                                <p>Fee Will Be Applied When Scanning Certificate.</p>
                            </ReactTooltip>
                        </span>}
                </div>
            </div>
        </React.Fragment>
    )
}


export default defaultTemplate(BookletOrderCreateFormTemplate);