import React from 'react';
import { defaultTemplate, formatDenomination } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import AsyncSelect from 'react-select/lib/Async';
import { renderIf, isSome } from 'core/utils';
import { BaasicFieldAsyncDropdown } from 'core/components';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { BookletOrderCreateFormTemplate } from 'themes/modules/common/booklet-order/components';
import _ from 'lodash';

function BookletOrderReviewTemplate({ bookletOrderReviewViewStore, t }) {
    const {
        form,
        loading,
        denominationTypes,
        bookletDropdownStore,
        bookletOrder
    } = bookletOrderReviewViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={true} loading={loading}>
                    <PageContentHeader>
                        {bookletOrder &&
                            <DonorAccountHeaderDetails userId={bookletOrder.donorAccountId} type='booklet-order' />}
                    </PageContentHeader>

                    <table className="table w--100">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Denomination</th>
                                <th className="table__head--data">Count</th>
                                <th className="table__head--data">Booklet(s)</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {form.$('bookletOrderItems').map(item => {
                                const denominationType = _.find(denominationTypes, { id: item.$('denominationTypeId').value });

                                return (<tr key={item.$('id').value}>
                                    <td className="table__body--data">{formatDenomination(denominationType, false)}</td>
                                    <td className="table__body--data">{item.$('count').value}</td>
                                    <td className="table__body--data">
                                        {bookletDropdownStore &&
                                            <AsyncSelect
                                                value={isSome(item.$('bookletOrderItemBooklets').value) ?
                                                    _.map(item.$('bookletOrderItemBooklets').value, function (n) { return { id: n.bookletId, name: n.code } })
                                                    :
                                                    null}
                                                onChange={(option) => {
                                                    let arra = [];
                                                    if (option) {
                                                        if (option.length > item.$('count').value) {
                                                            return;
                                                        }
                                                        _.map(option, function (item) {
                                                            arra.push({ bookletId: item.id, code: item.name });
                                                        })
                                                    }
                                                    item.$('bookletOrderItemBooklets').sync(arra);
                                                }}
                                                isMulti={true}
                                                isClearable={true}
                                                isLoading={loading}
                                                noOptionsMessage={() => {
                                                    let message = 'No Options';
                                                    if (item.$('bookletOrderItemBooklets').values().length >= item.$('count').value) {
                                                        message = 'Max Items Selected.'
                                                    }
                                                    return message;
                                                }
                                                }
                                                getOptionLabel={option => option[bookletDropdownStore.options.textField]}
                                                getOptionValue={option => option[bookletDropdownStore.options.dataItemKey]}
                                                defaultOptions={false} //  tells the control to immediately fire the remote request, described by your loadOptions
                                                loadOptions={(input, callback) => {
                                                    if (item.$('bookletOrderItemBooklets').values().length >= item.$('count').value) {
                                                        callback([])
                                                    }
                                                    bookletDropdownStore.onFilter({ value: { code: input, denominationTypeId: item.$('denominationTypeId').value } }).then(() => {
                                                        callback(bookletDropdownStore.items);
                                                    });
                                                }}
                                            />}
                                        {renderIf(isSome(item.$('bookletOrderItemBooklets').error))(
                                            <p className="type--tiny type--color--error">{item.$('bookletOrderItemBooklets').error}</p>
                                        )}

                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>


                </EditFormLayout>}
        </React.Fragment >
    );
};

export default defaultTemplate(BookletOrderReviewTemplate);
