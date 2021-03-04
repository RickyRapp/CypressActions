import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    FormatterResolver,
    BasicInput,
    BasicRadio,
    BaasicFormControls,
    BaasicFieldDropdown,
    Address,
    BaasicModal
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BookletOrderButtonCounterTemplate } from '../components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { DonorAutomaticContributionEditTemplate } from 'themes/application/donor/donor/components';

const BookletOrderCreateTemplate = function ({ store, t }) {
    const {
        contentLoading,
        form,
        donor,
        deliveryMethodTypes,
        denominationTypes,
        onChangeShippingAddressClick,
        onRemoveBookletClick,
        onAddBookletClick,
        orderContents,
        mixed500BookletAmount,
        mixed2000BookletAmount,
        bookletTypes,
        totalAmount,
        showMoreOptions,
        onShowMoreOptionsClick,
        customizedExpirationDateDropdownStore,
        isDefaultShippingAddress,
        onShowAllBooksClick,
        onAddProtectionPlanClick,
        protectionPlanModalParams
    } = store;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={store}>
                <Content loading={contentLoading} >
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row u-mar--bottom--lrg">
                            <div className="col col-sml-12 col-xxlrg-8">
                                <h4 style={{ display: "inline-block" }} className=" type--color--note u-mar--bottom--sml">{t('BOOKLET_ORDER.CREATE.ORDER_VOUCHERS_BOOKS')}</h4>
                            </div>
                            <div className="col col-sml-12 col-xxlrg-4">
                                <div className="card--sml card--secondary type--center">
                                    <h2 className="type--xlrg type--wgt--medium type--color--note"> <span className="type--med type--color--text">Balance:</span>
                                        {donor && <FormatterResolver
                                            item={{ availableBalance: donor.availableBalance }}
                                            field='availableBalance'
                                            format={{ type: 'currency' }}
                                        />}</h2>
                                </div>
                            </div>
                            <div className="col col-sml-12 col-xxlrg-4" onClick={onShowAllBooksClick}>
                                Show all orders
                        </div>
                        </div>

                        {bookletTypes.map(bt => {
                            return (
                                <div key={bt.id} className="row">
                                    {bt.abrv === 'classic' &&
                                        <div className="col col-sml-12 col-xxlrg-9 card--med u-align--self--end">
                                            <div className="row">
                                                {denominationTypes.map((dt, index) => {
                                                    const order = orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) ?
                                                        orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) : null;
                                                    const bookletAmount = order ? dt.value * order.bookletCount * 50 : 0;

                                                    return (
                                                        <React.Fragment key={dt.id}>
                                                            <div className="col col-sml-12 col-xxlrg-5 card--med u-align--self--end" style={{ display: `${index < 6 || showMoreOptions ? 'block' : 'none'}` }}>
                                                                <div className="u-separator--primary">
                                                                    <div className="row u-mar--bottom--sml u-display--flex--align--center">
                                                                        <div className="col col-sml-3">
                                                                            <div className="type--med type--wgt--regular">
                                                                                <FormatterResolver
                                                                                    item={{ value: dt.value }}
                                                                                    field='value'
                                                                                    format={{ type: 'currency' }}
                                                                                />
                                                                            </div>
                                                                            {(dt.value === 1 || dt.value === 2 || dt.value === 3 || dt.value === 5) &&
                                                                                <div className="counter__prepaid">{t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}</div>}
                                                                        </div>
                                                                        <div className="col col-sml-6 counter">
                                                                            <BookletOrderButtonCounterTemplate
                                                                                onRemoveBookletClick={onRemoveBookletClick}
                                                                                onAddBookletClick={onAddBookletClick}
                                                                                label={order && order.bookletCount.toString() || '0'}
                                                                                bookletType={bt}
                                                                                denominationType={dt}
                                                                            />
                                                                        </div>
                                                                        <div className="col col-sml-3">
                                                                            <div className="type--med type--wgt--regular type--right">
                                                                                <FormatterResolver
                                                                                    item={{ total: bookletAmount }}
                                                                                    field='total'
                                                                                    format={{ type: 'currency' }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {index % 2 === 0 &&
                                                                <div className="col-xxlrg-1"></div>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>}

                                    {(bt.abrv === 'mixed_500' || bt.abrv === 'mixed_2000') &&
                                        <React.Fragment>
                                            {bt.abrv === 'mixed_500' &&
                                                <div className="col col-sml-12 col-xxlrg-5 card--med u-align--self--end" style={{ display: `${showMoreOptions ? 'block' : 'none'}` }}>
                                                    <div className="row u-mar--bottom--sml u-display--flex--align--center">
                                                        <div className="col col-sml-3">
                                                            {bt.name}
                                                        </div>
                                                        <div className="col col-sml-6 counter">
                                                            <BookletOrderButtonCounterTemplate
                                                                onRemoveBookletClick={onRemoveBookletClick}
                                                                onAddBookletClick={onAddBookletClick}
                                                                label={orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === null) ?
                                                                    orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === null).bookletCount.toString() : '0'}
                                                                bookletType={bt}
                                                                denominationType={null}
                                                            />
                                                        </div>
                                                        <div className="col col-sml-3">
                                                            <div className="type--med type--wgt--regular type--right">
                                                                <FormatterResolver
                                                                    item={{ total: mixed500BookletAmount }}
                                                                    field='total'
                                                                    format={{ type: 'currency' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                            {bt.abrv === 'mixed_2000' &&
                                                <div className="col col-sml-12 col-xxlrg-5 card--med u-align--self--end" style={{ display: `${showMoreOptions ? 'block' : 'none'}` }}>
                                                    <div className="row u-mar--bottom--sml u-display--flex--align--center">
                                                        <div className="col col-sml-3">
                                                            {bt.name}
                                                        </div>
                                                        <div className="col col-sml-6 counter">
                                                            <BookletOrderButtonCounterTemplate
                                                                onRemoveBookletClick={onRemoveBookletClick}
                                                                onAddBookletClick={onAddBookletClick}
                                                                label={orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === null) ?
                                                                    orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === null).bookletCount.toString() : '0'}
                                                                bookletType={bt}
                                                                denominationType={null}
                                                            />
                                                        </div>
                                                        <div className="col col-sml-3">
                                                            <div className="type--med type--wgt--regular type--right">
                                                                <FormatterResolver
                                                                    item={{ total: mixed2000BookletAmount }}
                                                                    field='total'
                                                                    format={{ type: 'currency' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                                
                                        </React.Fragment>}
                                        {/* ToDo - Add Functionality */}
                                        <div className="col col-sml-12 col-xxlrg-3 card--med u-display--none" >
                                            <h3 className="u-mar--bottom--med">Selected</h3>
                                            <table className="table--total">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Check
                                                        </th>
                                                        <th>
                                                            Pcs
                                                        </th>
                                                        <th>
                                                            Amount
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>$0.00</td>
                                                        <td>1</td>
                                                        <td>$200.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>$0.00</td>
                                                        <td>1</td>
                                                        <td>$200.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>$0.00</td>
                                                        <td>1</td>
                                                        <td>$200.00</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colspan="2">Total</th>
                                                        <th>$500.00</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                </div>
                            )
                        })}
                        <div className="row u-mar--top--sml u-mar--bottom--sml">
                            <div className="col col-sml-12 type--center">
                                <button type="button" className="btn btn--show type--wgt--medium" onClick={onShowMoreOptionsClick}>
                                    <i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
                                    {showMoreOptions ? t('BOOKLET_ORDER.CREATE.HIDE_MORE_OPTIONS') : t('BOOKLET_ORDER.CREATE.SHOW_MORE_OPTIONS')}
                                    <i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
                                </button>
                            </div>
                        </div>
                        {/* <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 u-mar--bottom--sml type--center">
                            <button type="button" className="btn btn--show type--wgt--medium" onClick={() => form.$('isCustomizedBook').set(!form.$('isCustomizedBook').value)}>
                                <i className={!form.$('isCustomizedBook').value ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
                                {!form.$('isCustomizedBook').value ? t('BOOKLET_ORDER.CREATE.SHOW_CUSTOMIZE_BOOKS') : t('BOOKLET_ORDER.CREATE.HIDE_CUSTOMIZE_BOOKS')}
                                <i className={!form.$('isCustomizedBook').value ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
                            </button>
                        </div>
                        {form.$('isCustomizedBook').value &&
                            <React.Fragment>
                                {donor && donor.accountType.abrv === 'regular' &&
                                    <div className="col col-sml-12 col-xlrg-12">
                                        <strong>
                                            Additional charge of $5 per book
                                </strong>
                                    </div>}
                                <div className="col col-sml-12 col-xlrg-3">
                                    <BasicInput field={form.$('customizedName')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-3">
                                    <BasicInput field={form.$('customizedAddressLine1')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-3">
                                    <BasicInput field={form.$('customizedAddressLine2')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-2">
                                    <BasicInput field={form.$('customizedCity')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-2">
                                    <BasicInput field={form.$('customizedState')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-2">
                                    <BasicInput field={form.$('customizedZipCode')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-3">
                                    <BaasicFieldDropdown field={form.$('customizedExpirationDate')} store={customizedExpirationDateDropdownStore} />
                                </div>
                            </React.Fragment>
                        }
                    </div> */}

                        <div className="card--sml">
                            <div className="u-mar--bottom--med">
                                {donor && !donor.hasProtectionPlan && donor.availableBalance < totalAmount &&
                                    <div className="message--enh">
                                        <span className="u-mar--right--tny">
                                            {t('BOOKLET_ORDER.CREATE.BUTTON.ADD_PROTECTION_PLAN_MESSAGE')}
                                        </span>
                                        <a href="#" className="u-anchor--underline" onClick={onAddProtectionPlanClick}>
                                            {t('BOOKLET_ORDER.CREATE.BUTTON.ADD_PROTECTION_PLAN')}
                                        </a>
                                        {/* <BaasicButton
                                            className="btn btn--link"
                                            label={'BOOKLET_ORDER.CREATE.BUTTON.ADD_PROTECTION_PLAN'}
                                            >
                                        </BaasicButton> */}
                                    </div>
                                }
                            </div>
                            <div className="row row--form u-display--flex u-display--flex--align--end">
                                <div className="col col-sml-12 col-xlrg-8">
                                    <div className="type--sml type--wgt--medium">
                                        Current Balance:
                                    <span className="type--med type--color--note u-mar--left--sml u-push--to--lrg">
                                            {donor && <FormatterResolver
                                                item={{ availableBalance: donor.availableBalance }}
                                                field='availableBalance'
                                                format={{ type: 'currency' }}
                                            />}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="col col-sml-12 col-xlrg-4">
                                    <div className="type--med type--wgt--medium u-push--from--lrg">Total:
                                    <span className="type--xlrg type--wgt--medium type--color--note u-mar--left--sml u-push--to--lrg">
                                            <FormatterResolver
                                                item={{ total: totalAmount }}
                                                field='total'
                                                format={{ type: 'currency' }}
                                            />
                                        </span>
                                       
                                        {donor && donor.hasProtectionPlan &&
                                            <div><small>{t('BOOKLET_ORDER.CREATE.ENROLLED_IN_PROTECTION_PLAN')}<i className="u-icon u-icon--approve u-icon--base u-mar--left--sml"></i></small></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row row--form u-display--flex u-display--flex--align--center">
                            <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                                <span className="type--med type--wgt--medium type--color--note">
                                    {t('BOOKLET_ORDER.CREATE.DELIVERY_OPTIONS')}
                                </span>
                            </div>
                            {deliveryMethodTypes.map(c => {
                                return (
                                    <div key={c.id} className="col col-sml-12 col-med-12 col-lrg-3 u-mar--bottom--sml">
                                        <BasicRadio
                                            label={c.abrv === 'express-mail' ? `${c.name} (Additional $25)` : c.name}
                                            value={c.id}
                                            field={form.$('deliveryMethodTypeId')}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {deliveryMethodTypes && deliveryMethodTypes.length > 0 && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('deliveryMethodTypeId').value) &&
                        <div className="card--primary card--med u-mar--bottom--med">
                            {(form.$('deliveryMethodTypeId').value === deliveryMethodTypes.find(c => c.abrv === 'mail-usps').id || form.$('deliveryMethodTypeId').value === deliveryMethodTypes.find(c => c.abrv === 'express-mail').id) ?
                                <React.Fragment>
                                    <div className="row row--form u-mar--top--sml u-mar--bottom--sml">
                                        <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                                            <span className="type--med type--wgt--medium type--color--note">
                                                {t('BOOKLET_ORDER.CREATE.SHIPPING_ADDRESS')}
                                            </span>
                                        </div>
                                        {isDefaultShippingAddress ?
                                            <React.Fragment>
                                                {donor &&
                                                    <Address value={donor.donorAddress} format="booklet-order" />}
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <div className="col col-sml-12 col-xlrg-6 col-xxlrg-2 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('addressLine1')} />
                                                </div>
                                                <div className="col col-sml-12 col-xlrg-6 col-xxlrg-2 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('addressLine2')} />
                                                </div>
                                                <div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('city')} />
                                                </div>
                                                <div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('state')} />
                                                </div>
                                                <div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('zipCode')} />
                                                </div>
                                            </React.Fragment>}
                                    </div>
                                    <BaasicButton
                                        className="btn row--form btn--med btn--med--100 btn--primary"
                                        label={form.$('addressLine1').disabled ? 'BOOKLET_ORDER.CREATE.CHANGE_SHIPPING_ADDRESS' : 'BOOKLET_ORDER.CREATE.SET_DEFAULT_SHIPPING_ADDRESS'}
                                        onClick={() => onChangeShippingAddressClick()}>
                                    </BaasicButton>
                                </React.Fragment> :
                                <div className="row row--form u-mar--top--sml u-mar--bottom--sml">
                                    <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                                        <span className="type--med type--wgt--medium type--color--note">
                                            {t('BOOKLET_ORDER.CREATE.PICK_UP_ADDRESS')}
                                        </span>
                                    </div>
                                    <Address value={{ addressLine1: '328 3rd Street ', addressLine2: '', city: 'Lakewood', state: 'NJ', zipCode: '08701' }} format="booklet-order" />
                                </div>
                            }
                        </div>}
                </Content>
                <PageFooter>
                    <div>
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} disableSave={donor && !donor.hasProtectionPlan && donor.availableBalance < totalAmount} />
                    </div>
                </PageFooter>
            </ApplicationEditLayout>
            <BaasicModal modalParams={protectionPlanModalParams} >
                <DonorAutomaticContributionEditTemplate />
            </BaasicModal>
        </React.Fragment>
    )
};

BookletOrderCreateTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);