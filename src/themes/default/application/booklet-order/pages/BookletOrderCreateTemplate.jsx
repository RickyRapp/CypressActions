import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicDropdown,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { renderIf } from 'core/utils';
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
        donorAccount
    } = store;

    return (
        <ApplicationEditLayout store={store}>
            <Content loading={contentLoading} >
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">General Data</h3>
                    <div className="row">
                        <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                            <BaasicFieldDropdown store={deliveryMethodTypeDropdownStore} field={form.$('deliveryMethodTypeId')} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form__group col col-sml-2 col-lrg-2 u-mar--bottom--sml">
                            <div>
                                <label className="form__group__label">Count<span>*</span></label>
                                <input
                                    className={"input input--med input--text"}
                                    type="text"
                                    onChange={onCountChange}
                                    value={count} />
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
                                    icon='u-icon u-icon--edit u-icon--med'
                                    label='BOOKLET_ORDER.CREATE.BUTTON.EDIT'
                                    onlyIcon={true}
                                    onClick={() => onEdit(item)}
                                />
                                <BaasicButton
                                    className="btn btn--icon"
                                    icon='u-icon u-icon--delete u-icon--med'
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
                                <span> (Express Mail Fee In Amount Of $25)</span>}
                            {donorAccount && donorAccount.accountType.abrv === 'premium' &&
                                <div>Fee Will Be Applied When Scanning Certificate.</div>}
                        </div>
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

BookletOrderCreateTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);
