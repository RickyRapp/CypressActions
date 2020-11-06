import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    FormatterResolver,
    BasicInput,
    BasicFieldCheckbox,
    BasicRadio
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const BookletOrderCreateTemplate = function ({ bookletOrderCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        donor,
        deliveryMethodTypes,
        denominationTypes,
        onCustomizeYourBooksChange,
        onChangeShippingAddressClick,
        onRemoveBookletClick,
        onAddBookletClick,
        orderContents,
        mixedBookletAmount,
        bookletTypes,
        totalAmount
    } = bookletOrderCreateViewStore;

    return (
        <ApplicationEditLayout store={bookletOrderCreateViewStore}>
            <Content loading={contentLoading} >
                <div className="u-padd--right--med u-padd--left--med">
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row u-mar--bottom--xxlrg">
                            <div className="col col-sml-12 col-med-6 col-lrg-8 col-xlrg-10">
                                <h4 style={{ display: "inline-block" }} className="type--lrg type--wgt--medium type--color--note u-mar--bottom--sml">{t('BOOKLET_ORDER.CREATE.ORDER_VOUCHERS_BOOKS')}</h4>
                            </div>
                            <div className="col col-sml-8 col-med-6 col-lrg-4 col-xlrg-2">            
                                <div className="card--sml card--tertiary--light">
                                    <h2 className="type--xlrg type--wgt--medium type--color--note"> <span className="type--med type--color--text">Balance:</span> {donor && <FormatterResolver
                                        item={{ availableBalance: donor.availableBalance }}
                                        field='availableBalance'
                                        format={{ type: 'currency' }}
                                        />}</h2>
                                </div>
                            </div>
                        </div>

                        {bookletTypes.map(bt => {
                            return (
                                <div key={bt.id} className="row">
                                    {bt.abrv === 'classic' ?
                                        <React.Fragment>
                                            {denominationTypes.map(dt => {
                                                const order = orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) ?
                                                    orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) : null;
                                                const bookletAmount = order ? dt.value * order.bookletCount * 50 : 0;

                                                return (
                                                    <div key={dt.id} className="col col-sml-12 col-med-12 col-lrg-5 u-mar--bottom--sml card--med">
                                                        <div className="u-separator--primary">
                                                            <div className="row u-mar--bottom--sml">
                                                                <div className="col col-sml-12 col-med-12 col-lrg-3 ">
                                                                    <div className="type--med type--wgt--regular">
                                                                        <FormatterResolver
                                                                            item={{ value: dt.value }}
                                                                            field='value'
                                                                            format={{ type: 'currency' }}
                                                                            />
                                                                    </div>
                                                                    {(dt.value === 1 || dt.value === 2 || dt.value === 3 || dt.value === 5) &&
                                                                        <div className="type--tny type--color--note">{t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}</div>}
                                                                </div>
                                                                <div className="col col-sml-12 col-med-12 col-lrg-6">
                                                                    <BaasicButton
                                                                        className="btn btn--base btn--ghost btn--ghost--primary"
                                                                        icon={'u-icon u-icon--minus u-icon--med'}
                                                                        label='REMOVE'
                                                                        onlyIcon={true}
                                                                        onClick={() => onRemoveBookletClick(bt.id, dt.id)}>
                                                                    </BaasicButton>
                                                                    <BaasicButton
                                                                        className="btn btn--base btn--ghost btn--ghost--primary type--color--text"
                                                                        label={order && order.bookletCount.toString() || '0'}
                                                                        onClick={() => { }}>
                                                                    </BaasicButton>
                                                                    <BaasicButton
                                                                        className="btn btn--base btn--ghost btn--ghost--primary"
                                                                        icon={'u-icon u-icon--plus u-icon--med'}
                                                                        label='ADD'
                                                                        onlyIcon={true}
                                                                        onClick={() => onAddBookletClick(bt.id, dt.id)}>
                                                                    </BaasicButton>
                                                                </div>
                                                                <div className="col col-sml-12 col-med-12 col-lrg-3">
                                                                    <div className="type--med type--wgt--regular">
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
                                                )
                                            })}
                                        </React.Fragment>
                                        :
                                        <div className="col col-sml-12 col-med-12 col-lrg-5 u-mar--bottom--sml card--med">
                                            <div className="row">
                                                {denominationTypes.length > 0 &&
                                                    <div className="col col-sml-12 col-med-12 col-lrg-3">
                                                        <FormatterResolver
                                                            item={{ value: denominationTypes.find(dt => dt.value === 1).value }}
                                                            field='value'
                                                            format={{ type: 'currency' }}
                                                        />,
                                                        {" "}
                                                        <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 2).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        {" "}
                                                        <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 3).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />
                                                        <div className="type--tny type--color--note">
                                                            {t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}
                                                        </div>
                                                    </div> 
                                                    }
                                                <div className="col col-sml-12 col-med-12 col-lrg-6">
                                                    <BaasicButton
                                                        className="btn btn--base btn--ghost btn--ghost--primary"
                                                        icon={'u-icon u-icon--minus u-icon--med'}
                                                        label='REMOVE'
                                                        onlyIcon={true}
                                                        onClick={() => onRemoveBookletClick(bt.id, null)}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="btn btn--base btn--ghost btn--ghost--primary type--color--text"
                                                        label={
                                                            orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === null) ?
                                                                orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === null).bookletCount.toString() : '0'
                                                        }
                                                        onClick={() => { }}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="btn btn--base btn--ghost btn--ghost--primary"
                                                        icon={'u-icon u-icon--plus u-icon--med'}
                                                        label='ADD'
                                                        onlyIcon={true}
                                                        onClick={() => onAddBookletClick(bt.id, null)}>
                                                    </BaasicButton>
                                                </div>
                                                <div className="col col-sml-12 col-med-12 col-lrg-3">
                                                    <FormatterResolver
                                                        item={{ total: mixedBookletAmount }}
                                                        field='total'
                                                        format={{ type: 'currency' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })}

                        <div className="card--tertiary--light card--med u-mar--bottom--med">
                            <div className="row u-display--flex u-display--flex--align--center">
                                <div className="col col-sml-8">
                                    <div className="type--sml type--wgt--medium">
                                        Current Balance: 
                                        <span className="type--med type--color--note u-mar--left--sml">
                                            {donor && <FormatterResolver
                                                item={{ availableBalance: donor.availableBalance }}
                                                field='availableBalance'
                                                format={{ type: 'currency' }}
                                                />}
                                        </span>
                                    </div>
                                </div>
                                <div className="col col-sml-4">
                                    <div className="type--med type--wgt--medium u-push">Total: 
                                        <span className="type--xlrg type--wgt--medium type--color--note u-mar--left--sml">
                                            <FormatterResolver
                                            item={{ total: totalAmount }}
                                            field='total'
                                            format={{ type: 'currency' }}
                                        />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row u-mar--top--lrg">
                            <div className="col col-sml-12 col-med-12 col-lrg-5 u-mar--bottom--sml">
                                <div className="u-mar--bottom--med">
                                    <BasicFieldCheckbox
                                        field={form.$('isCustomizedBook')}
                                        onChange={(event) => onCustomizeYourBooksChange(event.target.checked)}
                                    />
                                </div>
                                <BasicInput field={form.$('customizedName')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card--primary card--med u-mar--bottom--med u-mar--right--med u-mar--left--med">
                    <div className="row">
                        <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                            <span className="type--med type--wgt--medium type--color--note">
                                {t('BOOKLET_ORDER.CREATE.DELIVERY_OPTIONS')}
                            </span>
                        </div>
                        {deliveryMethodTypes.map(c => {
                            return (
                                <div key={c.id} className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                                    <BasicRadio
                                        label={c.name}
                                        value={c.id}
                                        field={form.$('deliveryMethodTypeId')}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="card card--primary card--med u-mar--bottom--med u-mar--right--med u-mar--left--med">
                    <h4 className="type--med type--wgt--medium type--color--note">Shipping Address</h4>
                    <div className="row card--med">
                        <div className="col col-sml-12 col-med-12 col-lrg-3 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressLine1')} />
                        </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-3 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressLine2')} />
                        </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                            <BasicInput field={form.$('city')} />
                        </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                            <BasicInput field={form.$('state')} />
                        </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
                            <BasicInput field={form.$('zipCode')} />
                        </div>
                    </div>
                    <BaasicButton
                        className="btn btn--base btn--secondary--light u-mar--left--med"
                        label={form.$('addressLine1').disabled ? 'BOOKLET_ORDER.CREATE.CHANGE_SHIPPING_ADDRESS' : 'BOOKLET_ORDER.CREATE.SET_DEFAULT_SHIPPING_ADDRESS'}
                        onClick={() => onChangeShippingAddressClick(!form.$('addressLine1').disabled)}>
                    </BaasicButton>
                </div>

                {/* {form.has('bookletOrderContents') &&
                    <div>
                        <BaasicButton
                            className='btn btn--base btn--primary u-mar--bottom--sml'
                            type='button'
                            label='Add new booklet to order'
                            onClick={() => {
                                form.$('bookletOrderContents').add([{
                                    bookletTypeId: bookletTypes.find(c => c.abrv === 'classic').id,
                                    bookletCount: '',
                                    certificateContents: []
                                }])
                            }
                            }
                        />
                        {form.$('bookletOrderContents').map((item) => {
                            const bookletTypeDropdownStore = new BaasicDropdownStore();
                            bookletTypeDropdownStore.setItems(bookletTypes);

                            const denominationTypeDropdownStore = new BaasicDropdownStore();
                            denominationTypeDropdownStore.setItems(denominationTypes);

                            return (
                                < key={item.key} className="cardcard--primary card--med u-mar--bottom--sml">
                                    <div className="row">
                                        <div className="col col-sml-6 col-lrg-3">
                                            <NumericInputField field={item.$('bookletCount')} />
                                        </div>
                                        <div className="col col-sml-6 col-lrg-4">
                                            <div className='form__group__label'>
                                                Denomination<span>*</span>
                                                <BasicCheckbox
                                                    id={item.key + '1'}
                                                    checked={bookletTypes.find(c => c.abrv === 'mixed').id === item.$('bookletTypeId').value}
                                                    onChange={(event) => {
                                                        const bookletType = bookletTypes.find(c => c.abrv === (event.target.checked ? 'mixed' : 'classic'));
                                                        item.$('bookletTypeId').set(bookletType.id);

                                                        if (bookletType.abrv === 'mixed') {
                                                            const mixedDenominations = denominationTypes.filter(c => c.value >= 1 && c.value <= 3);
                                                            for (let index = 0; index < mixedDenominations.length; index++) {
                                                                const element = mixedDenominations[index];
                                                                item.$('certificateContents').add([{
                                                                    certificateCount: 20,
                                                                    denominationTypeId: element.id
                                                                }])
                                                            }
                                                        }
                                                        else {
                                                            const size = item.$('certificateContents').size;
                                                            for (let index = 0; index < size; index++) {
                                                                item.$('certificateContents').del(item.$('certificateContents').fields._keys[0])
                                                            }
                                                        }
                                                    }}
                                                    label='Mixed?'
                                                />
                                            </div>
                                            <BaasicDropdown
                                                store={denominationTypeDropdownStore}
                                                disabled={bookletTypes.find(c => c.abrv === 'mixed').id === item.$('bookletTypeId').value}
                                                value={bookletTypes.find(c => c.abrv === 'mixed').id === item.$('bookletTypeId').value ? denominationTypes.filter(c => c.value >= 1 && c.value <= 3) : ''}
                                                multi={bookletTypes.find(c => c.abrv === 'mixed').id === item.$('bookletTypeId').value}
                                                onChange={(event) => {
                                                    const denominationType = event.target.value;
                                                    item.$('certificateContents').add([{
                                                        certificateCount: denominationType.certificateAmount,
                                                        denominationTypeId: denominationType.id
                                                    }])
                                                    denominationTypeDropdownStore.onChange(denominationType)
                                                }}
                                            />
                                        </div>
                                        <div className="col col-sml-6 col-lrg-3">
                                            Total: ?
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>} */}
            </Content>
        </ApplicationEditLayout >
    )
};

BookletOrderCreateTemplate.propTypes = {
    bookletOrderCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);
