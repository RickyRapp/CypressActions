import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicDropdown,
    BaasicButton,
    BaasicInput
} from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { renderIf } from 'core/utils';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';
import _ from 'lodash';

const BookletOrderCreateTemplate = function ({ store, t }) {
    const {
        contentLoading,
        form,
        denominationTypeDropdownStore,
        deliveryMethodTypeDropdownStore,
        onDel,
        onAdd,
        onEdit,
        onCountChange,
        denominationTypes,
        countError,
        count,
        denominationError,
        mostCommonDenominations,
        totalAndFee,
        donorAccount,
        donorAccountId
    } = store;

    return (
        <ApplicationEditLayout store={store}>
            <AuthPageHeader donorAccountId={donorAccountId} type={3} authorization='theDonorsFundAdministrationSection.read' />
            <Content loading={contentLoading} >
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <div className="row">
                        <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                            <BaasicFieldDropdown store={deliveryMethodTypeDropdownStore} field={form.$('deliveryMethodTypeId')} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                            <div>
                                <label className="form__group__label">{t('BOOKLET_ORDER.CREATE.FIELDS.COUNT_LABEL')}<span>*</span></label>
                                <BaasicInput
                                    placeholder='BOOKLET_ORDER.CREATE.FIELDS.COUNT_PLACEHOLDER'
                                    onChange={onCountChange}
                                    value={count}
                                />
                                {renderIf(countError)(
                                    <div className="type--tny type--color--error u-mar--top--tny">
                                        <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>Field is required.
                                    </div>)}
                            </div>
                        </div>
                        <div className="form__group col col-sml-8 col-lrg-8 u-mar--bottom--sml">
                            <label className="form__group__label">Denomination<span>*</span></label>
                            <BaasicDropdown store={denominationTypeDropdownStore} />
                            {renderIf(denominationError)(
                                <div className="type--tny type--color--error u-mar--top--tny">
                                    <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>Field is required.
                                </div>)}
                        </div>
                        <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                            {t('BOOKLET_ORDER.CREATE.MOST_COMMON_DENOMINATIONS')}
                            {mostCommonDenominations.map((denomination) => {
                                return <BaasicButton
                                    key={denomination.id}
                                    type='button'
                                    className="btn btn--tny u-mar--left--sml"
                                    onClick={() => { denominationTypeDropdownStore.onChange(denomination) }}
                                    label={`$${denomination.value}`}
                                >
                                </BaasicButton>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                            <BaasicButton
                                className="btn btn--base btn--neutral u-mar--top--med"
                                label='BOOKLET_ORDER.CREATE.BUTTON.ADD'
                                onClick={onAdd}
                            />
                        </div>
                    </div>
                    {form.$('bookletOrderItems').size > 0 && form.$('bookletOrderItems').map(item =>
                        <div className="row" key={item.key}>
                            <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                                <span className={"input input--med input--text input--disabled"}>{item.$('count').value}</span>
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-8 u-mar--bottom--sml">
                                {denominationTypes &&
                                    <span className={"input input--med input--text input--disabled"}>
                                        {_.find(denominationTypes, { id: item.$('denominationTypeId').value }).name}
                                    </span>}
                            </div>
                            <div className="form__group col col-sml-2 col-lrg-2">
                                <BaasicButton
                                    className="btn btn--icon"
                                    icon='u-icon u-icon--edit u-icon--sml'
                                    label='BOOKLET_ORDER.CREATE.BUTTON.EDIT'
                                    onlyIcon={true}
                                    onClick={() => onEdit(item)}
                                />
                                <BaasicButton
                                    className="btn btn--icon"
                                    icon='u-icon u-icon--delete u-icon--sml'
                                    label='BOOKLET_ORDER.CREATE.BUTTON.DELETE'
                                    onlyIcon={true}
                                    onClick={() => onDel(item)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="row u-mar--top--med">
                        <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                            {t('BOOKLET_ORDER.CREATE.TOTAL')} ${totalAndFee.total}
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            {t('BOOKLET_ORDER.CREATE.TOTAL_WITH_FEE')} ${totalAndFee.totalWithFee}
                            {deliveryMethodTypeDropdownStore.value && deliveryMethodTypeDropdownStore.value.abrv === 'express-mail' &&
                                <span>{t('BOOKLET_ORDER.CREATE.EXPRESS_MAIL_FEE')}</span>}
                            {donorAccount && donorAccount.accountType.abrv === 'premium' &&
                                <div>{t('BOOKLET_ORDER.CREATE.PREMIUM_FEE_APPLIED')}</div>}
                        </div>
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

const AuthPageHeader = withAuth(DonorAccountPageHeaderOverview);

BookletOrderCreateTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);
