import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { renderIf } from 'core/utils';
import { BaasicDropdownStore } from 'core/stores';
import {
    BaasicDropdown
} from 'core/components';
import _ from 'lodash';

const BookletOrderReviewRowTemplate = function ({ item, fetchFunc, denominationTypes, assignError, t }) {
    const denominationType = _.find(denominationTypes, { id: item.$('denominationTypeId').value });
    const usedBookletIds = _.map(item.$('bookletOrderItemBooklets').value, (params) => { return params.bookletId });

    let bookletDropdownStore = new BaasicDropdownStore(
        {
            multi: true,
            placeholder: 'BOOKLET_ORDER.REVIEW.FIELDS.BOOKLET_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
        {
            fetchFunc: async (searchQuery) => {
                if (searchQuery && searchQuery.length >= 5) {
                    return fetchFunc(searchQuery, denominationType.id, usedBookletIds);
                }

                return [];
            }
        }
    );

    return (
        <div className="row" key={item.$('id').value}>
            <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                {denominationType.name}
            </div>
            <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                {item.$('count').value}
            </div>
            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                <BaasicDropdown
                    store={bookletDropdownStore}
                    value={item.$('bookletOrderItemBooklets').value ?
                        _.map(item.$('bookletOrderItemBooklets').value, (params) => {
                            return {
                                id: params.bookletId,
                                name: String(params.booklet.code)
                            }
                        })
                        :
                        null
                    }
                    onChange={(e) => {
                        let booklets = [];
                        if (e) {
                            if (e.target.value.length > item.$('count').value) {
                                return;
                            }
                            _.map(e.target.value, function (item) {
                                booklets.push({ bookletId: item.id, booklet: { code: item.name } });
                            })
                        }
                        const size = item.$('bookletOrderItemBooklets').size;
                        for (let index = 0; index < size; index++) {
                            item.$('bookletOrderItemBooklets').del(index);
                        }
                        item.$('bookletOrderItemBooklets').add(booklets);
                    }}
                    listNoDataRender={(element) => listNoDataRender(element, item.$('bookletOrderItemBooklets').values().length >= item.$('count').value)}
                    filterable={item.$('bookletOrderItemBooklets').values().length < item.$('count').value}
                />
                {item.$('count').value !== item.$('bookletOrderItemBooklets').values().length &&
                    <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>Need to assign {item.$('count').value - item.$('bookletOrderItemBooklets').values().length} more booklet/s.</div>
                }
            </div>
        </div>
    )
};

BookletOrderReviewRowTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const listNoDataRender = (element, maxItemSelected) => {
    const noData = (
        <h4 style={{ fontSize: '1em' }}>
            <span className="k-icon k-i-warning" style={{ fontSize: '2.5em' }} />
            <br /><br />
            no data here
        </h4>
    );

    const maxData = (
        <h4 style={{ fontSize: '1em' }}>
            <span className="k-icon k-i-warning" style={{ fontSize: '2.5em' }} />
            <br /><br />
            max booklet selected
        </h4>
    );

    return React.cloneElement(element, { ...element.props }, maxItemSelected ? maxData : noData);
}

export default defaultTemplate(BookletOrderReviewRowTemplate);
