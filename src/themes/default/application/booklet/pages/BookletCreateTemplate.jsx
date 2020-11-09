import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    BaasicFieldDropdown,
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
                            className='btn btn--base btn--primary u-mar--bottom--sml'
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
                            const isMixedBooklet = bookletTypes.find(c => c.abrv === 'mixed').id === item.$('bookletTypeId').value;

                            return (
                                <div key={item.key} className="card--secondary card--med u-mar--bottom--med">
                                    <div className="row u-mar--bottom--sml">
                                        <div className="col col-sml-6">
                                            <div className="row">
                                                <div className="col col-sml-12 u-mar--bottom--sml">
                                                    <BaasicFieldDropdown store={bookletTypeDropdownStore} field={item.$('bookletTypeId')} />
                                                </div>
                                                <div className="col col-sml-12 u-mar--bottom--sml">
                                                    <NumericInputField field={item.$('bookletCount')} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-sml-12 col-lrg-12 u-mar--top--sml">
                                            <BaasicButton
                                                className='btn btn--base btn--ghost'
                                                type='button'
                                                label='Delete booklet'
                                                onClick={item.onDel}
                                            />
                                        </div>
                                    </div>
                                    {item.$('bookletTypeId').value && item.has('bookletContents') &&
                                        <div className="">
                                            {isMixedBooklet &&
                                                <BaasicButton
                                                    className='btn btn--base btn--primary u-mar--bottom--sml'
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
                                                });
                                                denominationTypeDropdownStore.setItems(denominationTypes);
                                                return (
                                                    <div key={content.key} >
                                                        <div className="row">
                                                            <div className="col col-sml-6 col-lrg-6">
                                                                <div className="row">
                                                                    <div className="col col-sml-12 u-mar--bottom--sml">
                                                                        <BaasicFieldDropdown store={denominationTypeDropdownStore} field={content.$('denominationTypeId')} />
                                                                    </div>
                                                                    <div className="col col-sml-12 u-mar--bottom--sml">
                                                                        <NumericInputField field={content.$('certificateCount')} />
                                                                        {isMixedBooklet && arr.length - 1 === i &&
                                                                            <span className="type--sml type--wgt--medium type--color--note"><span className="type--color--text">Total certificates per booklet:</span> {_.sumBy(item.$('bookletContents').values(), (o) => { return o.certificateCount })}</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {isMixedBooklet && item.$('bookletContents').size > 1 &&
                                                                <div className="col col-sml-12 u-mar--bottom--sml ">
                                                                    <div className="row">
                                                                        <div className="col col-sml-6 u-mar--bottom--sml u-padd--bottom--med u-separator--primary">
                                                                            <BaasicButton
                                                                                className='btn btn--base btn--ghost'
                                                                                type='button'
                                                                                label='Delete denomination'
                                                                                onClick={content.onDel}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>}
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
