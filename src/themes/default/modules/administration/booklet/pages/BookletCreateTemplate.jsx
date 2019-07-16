import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicButton } from 'core/components';
import { EditFormLayout } from 'core/layouts';
import _ from 'lodash';

function BookletCreateTemplate({ bookletCreateViewStore, t }) {
    const {
        form,
        loading,
        denominationTypeDropdownStore,
        onDel,
        refresh
    } = bookletCreateViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={false} loading={loading} key={refresh}>
                    {form.$('items').map(item =>
                        <div className="f-row" key={item.key}>
                            <div className="form__group f-col f-col-lrg-2">
                                <BasicInput field={item.$('count')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-8">
                                {denominationTypeDropdownStore &&
                                    <BaasicFieldDropdown field={item.$('denominationTypeId')} store={denominationTypeDropdownStore} />}
                            </div>

                            <div className="form__group f-col f-col-lrg-2">
                                {form.$('items').size > 1 &&
                                    <button
                                        className="btn btn--sml btn--primary spc--top--med"
                                        onClick={() => onDel(item)}>
                                        <span className="icomoon icon-remove tiny align--v--baseline spc--right--tny" />
                                        <span className="align--v--bottom">{t('DELETE')}</span>
                                    </button>}
                            </div>
                        </div>
                    )}

                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            {form.$('items').value &&
                                <button
                                    className="btn btn--sml btn--tertiary spc--top--med"
                                    onClick={form.$('items').onAdd}>
                                    <span className="icomoon icon-add tiny align--v--baseline spc--right--tny" />
                                    <span className="align--v--bottom">{t('ADD')}</span>
                                </button>}
                        </div>
                    </div>

                </EditFormLayout>}
        </React.Fragment >
    );
};

export default defaultTemplate(BookletCreateTemplate);
