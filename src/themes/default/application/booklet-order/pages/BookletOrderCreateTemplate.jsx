import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    NumericInputField,
    BaasicDropdown,
    BasicCheckbox,
    FormDebug
} from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorPageHeaderOverview } from 'application/donor/components';
import { BaasicDropdownStore } from 'core/stores';

const BookletOrderCreateTemplate = function ({ bookletOrderCreateViewStore }) {
    const {
        contentLoading,
        form,
        denominationTypes,
        bookletTypes,
        donorId
    } = bookletOrderCreateViewStore;

    return (
        <ApplicationEditLayout store={bookletOrderCreateViewStore}>
            <AuthPageHeader donorId={donorId} type={3} authorization='theDonorsFundAdministrationSection.read' />
            <Content loading={contentLoading} >
                {form.has('bookletOrderContents') &&
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
                                <div key={item.key} className="card card--form card--primary card--med u-mar--bottom--sml">
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
                    </div>}
                <FormDebug form={form}></FormDebug>
            </Content>
        </ApplicationEditLayout >
    )
};

const AuthPageHeader = withAuth(DonorPageHeaderOverview);

BookletOrderCreateTemplate.propTypes = {
    bookletOrderCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);
