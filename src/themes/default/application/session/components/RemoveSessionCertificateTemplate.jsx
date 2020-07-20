import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicFieldCheckbox,
    BasicInput,
    EditFormContent,
    ApplicationEmptyState,
    BaasicFieldDropdown,
    FormatterResolver,
    BaasicFormControls
} from 'core/components'

const RemoveSessionCertificateTemplate = function ({ removeSessionCertificateViewStore, t, }) {
    const {
        contentLoading,
        form,
        certificateStatusDropdownStore,
        isPrivate,
        certificateValue,
        certificateFeeValue
    } = removeSessionCertificateViewStore;

    return (
        <section>
            <EditFormContent
                form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={contentLoading}>

                <h3 className="u-mar--bottom--med">{t('SESSION.EDIT.LIST.REMOVE_SESSION_CERTIFICATE')}</h3>
                <div className="row">
                    {isPrivate ?
                        <React.Fragment>
                            <div className="form__group col col-lrg-12">
                                <h5>{t('SESSION.EDIT.LIST.REMOVE_PRIVATE_SESSION_CERTIFICATE')}</h5>
                            </div>
                            <div className="form__group col col-lrg-12">
                                {t('SESSION.EDIT.LIST.PRIVATE_REFUND_MESSAGE')}
                            </div>
                            <div className="form__group col col-lrg-12">
                                <ul>
                                    <li>
                                        {t('SESSION.EDIT.LIST.TOTAL_REFUND_CERTIFICATE')}
                                        <FormatterResolver
                                            item={{ certificateValue: certificateValue }}
                                            field='certificateValue'
                                            format={{ type: 'currency' }}
                                        />
                                    </li>
                                    <li>
                                        {t('SESSION.EDIT.LIST.TOTAL_REFUND_FEE')}
                                        <FormatterResolver
                                            item={{ certificateFeeValue: certificateFeeValue }}
                                            field='certificateFeeValue'
                                            format={{ type: 'currency' }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className="form__group col col-lrg-12">
                                <h5>{t('SESSION.EDIT.LIST.REMOVE_BASIC_SESSION_CERTIFICATE')}</h5>
                            </div>
                            <div className="form__group col col-lrg-4">
                                <BasicFieldCheckbox field={form.$('makeRefund')} />
                            </div>
                            {form.$('makeRefund').value === true &&
                                <React.Fragment>
                                    <div className="form__group col col-lrg-4">
                                        <BasicFieldCheckbox field={form.$('makeRefundFee')} />
                                    </div>
                                    <div className="form__group col col-lrg-4">
                                        {t('SESSION.EDIT.LIST.TOTAL_REFUND')}
                                        {form.$('makeRefundFee').value === true ?
                                            <FormatterResolver
                                                item={{ total: certificateValue + certificateFeeValue }}
                                                field='total'
                                                format={{ type: 'currency' }}
                                            /> :
                                            <FormatterResolver
                                                item={{ certificateValue: certificateValue }}
                                                field='certificateValue'
                                                format={{ type: 'currency' }}
                                            />}
                                    </div>
                                </React.Fragment>}
                        </React.Fragment>}
                </div>
                <h5 className="u-mar--top--med">{t('SESSION.EDIT.LIST.CERTIFICATE_DETAILS')}</h5>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BaasicFieldDropdown
                            field={form.$('certificateStatusId')}
                            store={certificateStatusDropdownStore}
                        />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('note')} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <BasicFieldCheckbox field={form.$('isActive')} />
                    </div>
                </div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </EditFormContent>
        </section>
    )
}

RemoveSessionCertificateTemplate.propTypes = {
    removeSessionCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(RemoveSessionCertificateTemplate);
