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

const BookletOrderCreateTemplate = function ({ store, t }) {
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
        mixed500BookletAmount,
        mixed2000BookletAmount,
        bookletTypes,
        totalAmount,
        showMoreOptions,
        onShowMoreOptionsClick,
        onShowCustomizeBooksClick,
        showCustomizeBooks
    } = store;

    return (
        <ApplicationEditLayout store={store}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row u-mar--bottom--lrg">
                        <div className="col col-sml-12 col-med-6 col-lrg-8 col-xlrg-9">
                            <h4 style={{ display: "inline-block" }} className="type--lrg type--wgt--medium type--color--note u-mar--bottom--sml">{t('BOOKLET_ORDER.CREATE.ORDER_VOUCHERS_BOOKS')}</h4>
                        </div>
                        <div className="col col-sml-8 col-med-6 col-lrg-4 col-xlrg-3">
                            <div className="card--sml card--tertiary--light type--center">
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
                                        {denominationTypes.map((dt, index) => {
                                            const order = orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) ?
                                                orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id) : null;
                                            const bookletAmount = order ? dt.value * order.bookletCount * 50 : 0;

                                            return (
                                                <React.Fragment key={dt.id}>
                                                    <div className="col col-sml-12 col-med-12 col-lrg-4 card--med" style={{ display: `${index < 6 || showMoreOptions ? 'block' : 'none'}` }}>
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
                                                                        <div className="type--tny type--prepaid">{t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}</div>}
                                                                </div>
                                                                <div className="col col-sml-6 counter">
                                                                    <BaasicButton
                                                                        className="counter__btn"
                                                                        icon={'counter__icon counter__icon--minus'}
                                                                        label='REMOVE'
                                                                        onlyIcon={true}
                                                                        onClick={() => onRemoveBookletClick(bt.id, dt.id)}>
                                                                    </BaasicButton>
                                                                    <BaasicButton
                                                                        className="counter__btn counter__btn--count type--wgt--medium"
                                                                        label={order && order.bookletCount.toString() || '0'}
                                                                        onClick={() => { }}>
                                                                    </BaasicButton>
                                                                    <BaasicButton
                                                                        className="counter__btn"
                                                                        icon={'counter__icon counter__icon--plus'}
                                                                        label='ADD'
                                                                        onlyIcon={true}
                                                                        onClick={() => onAddBookletClick(bt.id, dt.id)}>
                                                                    </BaasicButton>
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
                                                    <div className="col col-sml-1"></div>
                                                </React.Fragment>
                                            )
                                        })}
                                    </React.Fragment>
                                    :
                                    <div className="col col-sml-12 col-med-12 col-lrg-5 card--med" style={{ display: `${showMoreOptions ? 'block' : 'none'}` }}>
                                        {bt.abrv === 'mixed_500' &&
                                            <div className="row u-mar--top--med">
                                                {denominationTypes.length > 0 &&
                                                    <div className="col col-sml-4">
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 1).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                    </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 5).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                    </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 10).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 18).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 25).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 50).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />
                                                        </span>
                                                        <div className="type--tny type--color--note">
                                                            {t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}
                                                        </div>
                                                    </div>
                                                }
                                                <div className="col col-sml-5 counter">
                                                    <BaasicButton
                                                        className="counter__btn"
                                                        icon={'counter__icon counter__icon--minus'}
                                                        label='REMOVE'
                                                        onlyIcon={true}
                                                        onClick={() => onRemoveBookletClick(bt.id, null)}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="counter__btn counter__btn--count type--wgt--medium"
                                                        label={
                                                            orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === null) ?
                                                                orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === null).bookletCount.toString() : '0'
                                                        }
                                                        onClick={() => { }}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="counter__btn"
                                                        icon={'counter__icon counter__icon--plus'}
                                                        label='ADD'
                                                        onlyIcon={true}
                                                        onClick={() => onAddBookletClick(bt.id, null)}>
                                                    </BaasicButton>
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
                                            </div>}
                                        {bt.abrv === 'mixed_2000' &&
                                            <div className="row u-mar--top--med">
                                                {denominationTypes.length > 0 &&
                                                    <div className="col col-sml-4">
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 0).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                    </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 5).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                    </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 18).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                    </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 36).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 50).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 100).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />,
                                                        </span>
                                                        {" "}
                                                        <span className="type--med type--wgt--regular">
                                                            <FormatterResolver
                                                                item={{ value: denominationTypes.find(dt => dt.value === 180).value }}
                                                                field='value'
                                                                format={{ type: 'currency' }}
                                                            />
                                                        </span>
                                                        <div className="type--tny type--color--note">
                                                            {t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}
                                                        </div>
                                                    </div>
                                                }
                                                <div className="col col-sml-5 counter">
                                                    <BaasicButton
                                                        className="counter__btn"
                                                        icon={'counter__icon counter__icon--minus'}
                                                        label='REMOVE'
                                                        onlyIcon={true}
                                                        onClick={() => onRemoveBookletClick(bt.id, null)}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="counter__btn counter__btn--count type--wgt--medium"
                                                        label={
                                                            orderContents.some(s => s.bookletTypeId === bt.id && s.denominationTypeId === null) ?
                                                                orderContents.find(s => s.bookletTypeId === bt.id && s.denominationTypeId === null).bookletCount.toString() : '0'
                                                        }
                                                        onClick={() => { }}>
                                                    </BaasicButton>
                                                    <BaasicButton
                                                        className="counter__btn"
                                                        icon={'counter__icon counter__icon--plus'}
                                                        label='ADD'
                                                        onlyIcon={true}
                                                        onClick={() => onAddBookletClick(bt.id, null)}>
                                                    </BaasicButton>
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
                                            </div>}
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div className="row u-mar--top--sml u-mar--bottom--sml">
                        <div className="col col-sml-12 col-med-9 type--center">
                            <button type="button" className="btn btn--lrg btn--show type--wgt--medium" onClick={onShowMoreOptionsClick}>
                                <i className="u-icon u-icon--sml u-icon--arrow-down"></i>
                                {showMoreOptions ? t('BOOKLET_ORDER.CREATE.HIDE_MORE_OPTIONS') : t('BOOKLET_ORDER.CREATE.SHOW_MORE_OPTIONS')}
                                <i className="u-icon u-icon--sml u-icon--arrow-down"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 col-med-9 u-mar--bottom--sml type--center">
                            <button type="button" className="btn btn--lrg btn--show type--wgt--medium" onClick={onShowCustomizeBooksClick}>
                                <i className="u-icon u-icon--sml u-icon--arrow-down"></i>
                                {!showCustomizeBooks ? t('BOOKLET_ORDER.CREATE.SHOW_CUSTOMIZE_BOOKS') : t('BOOKLET_ORDER.CREATE.HIDE_CUSTOMIZE_BOOKS')}
                                <i className="u-icon u-icon--sml u-icon--arrow-down"></i>
                            </button>
                        </div>
                        {showCustomizeBooks &&
                            <div className="col col-sml-12 col-med-12 col-lrg-5 u-mar--bottom--sml u-padd--left--xlrg">
                                <div className="u-mar--bottom--med">
                                    <BasicFieldCheckbox
                                        field={form.$('isCustomizedBook')}
                                        onChange={(event) => onCustomizeYourBooksChange(event.target.checked)}
                                    />
                                </div>
                                <BasicInput field={form.$('customizedName')} />
                            </div>
                        }
                    </div>

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
                </div>

                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row u-display--flex u-display--flex--align--center">
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

                <div className="card--primary card--med u-mar--bottom--med">
                    <h4 className="type--med type--wgt--medium type--color--note">Shipping Address</h4>
                    <div className="row u-mar--top--sml u-mar--bottom--sml u-padd--right--sml u-padd--left--sml">
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
                        className="btn btn--med btn--secondary--light u-mar--left--sml"
                        label={form.$('addressLine1').disabled ? 'BOOKLET_ORDER.CREATE.CHANGE_SHIPPING_ADDRESS' : 'BOOKLET_ORDER.CREATE.SET_DEFAULT_SHIPPING_ADDRESS'}
                        onClick={() => onChangeShippingAddressClick(!form.$('addressLine1').disabled)}>
                    </BaasicButton>
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
