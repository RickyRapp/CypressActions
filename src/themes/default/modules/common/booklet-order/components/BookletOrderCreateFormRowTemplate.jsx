import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicFieldDropdown, BasicInput } from 'core/components';
import NumberFormat from 'react-number-format';

function BookletOrderCreateFormRowTemplate({ denominationTypeDropdownStore, item, mostCommonDenominations, onDel, form, t }) {

    return (
        <div className="f-row" key={item.key}>
            <div className="form__group f-col f-col-lrg-2">
                <BasicInput field={item.$('count')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                {denominationTypeDropdownStore &&
                    <BaasicFieldDropdown field={item.$('denominationTypeId')} store={denominationTypeDropdownStore} />}
                {(!item.$('count').value || !item.$('denominationTypeId').value) && mostCommonDenominations && mostCommonDenominations.length > 0 &&
                    <div>
                        Most Common Denominations:
                                        {mostCommonDenominations.map(denomination => {
                            return <button
                                key={denomination.id}
                                className="btn btn--tny btn--rounded"
                                onClick={() => {
                                    item.$('denominationTypeId').set('value', denomination.id);
                                    denominationTypeDropdownStore.onChange(denomination);
                                }}>
                                <NumberFormat value={denomination.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </button>
                        })}
                    </div>
                }
            </div>

            <div className="form__group f-col f-col-lrg-2">
                {form.$('bookletOrderItems').size > 1 &&
                    <button
                        className="btn btn--sml btn--primary spc--top--med"
                        onClick={() => onDel(item)}>
                        <span className="icomoon icon-remove tiny align--v--baseline spc--right--tny" />
                        <span className="align--v--bottom">{t('DELETE')}</span>
                    </button>}
            </div>
        </div>
    );
}

export default defaultTemplate(BookletOrderCreateFormRowTemplate);