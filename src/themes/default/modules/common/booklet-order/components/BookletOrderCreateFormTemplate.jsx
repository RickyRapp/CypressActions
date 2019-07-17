import React from 'react';
import { BaasicFieldDropdown, BasicInput, BasicCheckBox } from 'core/components';
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
        refresh,
        onDel,
        donorAccount,
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

            <React.Fragment key={refresh}>
                {form.$('bookletOrderItems').map(item =>
                    <div className="f-row" key={item.key}>
                        <div className="form__group f-col f-col-lrg-2">
                            <BasicInput field={item.$('count')} />
                        </div>
                        <div className="form__group f-col f-col-lrg-8">
                            {denominationTypeDropdownStore &&
                                <BaasicFieldDropdown field={item.$('denominationTypeId')} store={denominationTypeDropdownStore} />}
                        </div>

                        <div className="form__group f-col f-col-lrg-2">
                            {form.$('bookletOrderItems').size > 1 &&
                                <button
                                    className="btn btn--sml btn--primary spc--top--med"
                                    onClick={() => onDel(item)}>
                                    <span className="icomoon icon-remove tiny align--v--baseline spc--right--tny" />
                                    <span className="align--v--bottom">{t('DELETE')}</span>
                                </button>}
                        </div>
                    </div>
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
                </div>
            </div>
        </React.Fragment>
    )
}


export default defaultTemplate(BookletOrderCreateFormTemplate);