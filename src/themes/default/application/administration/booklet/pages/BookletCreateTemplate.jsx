import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    BaasicFieldDropdown,
    FormatterResolver,
    NumericInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import _ from 'lodash';
import { BaasicDropdownStore } from 'core/stores';

const BookletCreateTemplate = function ({ bookletCreateViewStore }) {
    const {
        contentLoading,
        form,
        bookletTypes,
        denominationTypes
    } = bookletCreateViewStore;

    return (
        <ApplicationEditLayout store={bookletCreateViewStore}>
            <Content loading={contentLoading} >
                {form.has('items') &&
                    <div className="card--primary card--med u-mar--bottom--med">
                        <BaasicButton
                            className='btn btn--med btn--primary'
                            type='button'
                            label='Add new booklet'
                            onClick={() => {
                                form.$('items').add([{
                                    bookletTypeId: '',
                                    bookletCount: '',
                                    bookletContents: []
                                }])
                            }
                            }
                        />
                        {form.$('items').map((item) => {
                            const bookletTypeDropdownStore = new BaasicDropdownStore(null, {
                                onChange: () => {
                                    if (item.$('bookletContents').size > 0) {
                                        const size = item.$('bookletContents').size;
                                        for (let index = 0; index < size; index++) {
                                            item.$('bookletContents').del(item.$('bookletContents').fields._keys[0])
                                        }
                                    }
                                    item.$('bookletContents').add([{
                                        denominationTypeId: '',
                                        certificateCount: ''
                                    }])
                                }
                            });
                            bookletTypeDropdownStore.setItems(bookletTypes);
                            const isMixed500Booklet = bookletTypes.find(c => c.abrv === 'mixed_500').id === item.$('bookletTypeId').value;
                            const isMixed2000Booklet = bookletTypes.find(c => c.abrv === 'mixed_2000').id === item.$('bookletTypeId').value;  //eslint-disable-line

                            return (
                                <div key={item.key} className="card--secondary card--med u-mar--top--med">
                                    <div className="row">
                                        <div className="col col-sml-12 col-xlrg-6 col-xxlrg-5 u-mar--bottom--sml">
                                            <BaasicFieldDropdown store={bookletTypeDropdownStore} field={item.$('bookletTypeId')} />
                                        </div>
                                        <div className="col col-sml-12 col-xlrg-6 col-xxlrg-5 u-mar--bottom--sml">
                                            <NumericInputField field={item.$('bookletCount')} />
                                        </div>
                                        <div className="col col-sml-12 col-xxlrg-2">
                                            <BaasicButton
                                                className='btn btn--med btn--ghost u-mar--top--base--alt'
                                                type='button'
                                                label='Delete booklet'
                                                onClick={item.onDel}
                                            />
                                        </div>
                                    </div>
                                    {item.$('bookletTypeId').value && item.has('bookletContents') &&
                                        <div className="">
                                            {isMixed500Booklet &&
                                                <BaasicButton
                                                    className='btn btn--med btn--primary u-mar--bottom--sml'
                                                    type='button'
                                                    label='Add denomination'
                                                    onClick={() => {
                                                        item.$('bookletContents').add([{
                                                            denominationTypeId: '',
                                                            certificateCount: ''
                                                        }])
                                                    }
                                                    }
                                                />}
                                            {item.$('bookletContents').map((content, i, arr) => {
                                                const denominationTypeDropdownStore = new BaasicDropdownStore(null, {
                                                    onChange: (denominationId) => {
                                                        content.$('certificateCount').set(denominationTypes.find(c => c.id === denominationId).certificateAmount)
                                                    }
                                                }, denominationTypes);
                                                return (
                                                    <div key={content.key} >
                                                        <div className="row u-mar--bottom--med">
                                                            <div className="col col-sml-12 col-xxlrg-5 u-mar--bottom--sml">
                                                                <BaasicFieldDropdown
                                                                    store={denominationTypeDropdownStore}
                                                                    field={content.$('denominationTypeId')}
                                                                    itemRender={(li, itemProps) => {
                                                                        const itemChildren = <FormatterResolver format={{ type: 'denomination', value: isMixed500Booklet ? 'short' : 'long' }} item={{ dataItem: itemProps.dataItem }} field='dataItem' />
                                                                        return React.cloneElement(li, li.props, itemChildren);
                                                                    }}
                                                                    valueRender={(element, value) => {
                                                                        if (!value) return element;
                                                                        const itemChildren = <FormatterResolver format={{ type: 'denomination', value: isMixed500Booklet ? 'short' : 'long' }} item={{ dataItem: value }} field='dataItem' />
                                                                        return React.cloneElement(element, { ...element.props }, itemChildren);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col col-sml-12 col-xxlrg-5 u-mar--bottom--sml">
                                                                <NumericInputField field={content.$('certificateCount')} />
                                                                
                                                            </div>
                                                            {isMixed500Booklet && item.$('bookletContents').size > 1 &&
                                                                <div className="col col-sml-12 col-lrg-2">
                                                                    <BaasicButton
                                                                        className='btn btn--med btn--ghost u-mar--top--base--alt'
                                                                        type='button'
                                                                        label='Delete denomination'
                                                                        onClick={content.onDel}
                                                                    />
                                                                </div>}
                                                                <div className="col col-sml-12 col-med-5"></div>
                                                                <div className="col col-sml-12 col-med-5">{isMixed500Booklet && arr.length - 1 === i &&
                                                                    <span className="type--sml type--wgt--medium type--color--note"><span className="type--color--text">Total certificates per booklet:</span> {_.sumBy(item.$('bookletContents').values(), (o) => { return o.certificateCount })}</span>}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>}
            </Content>
        </ApplicationEditLayout >
    )
};

BookletCreateTemplate.propTypes = {
    bookletCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletCreateTemplate);
