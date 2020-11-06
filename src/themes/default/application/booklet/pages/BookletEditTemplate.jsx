import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BookletEditRowTemplate } from 'themes/application/booklet/components';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BaasicButton } from 'core/components';
import moment from 'moment';
import _ from 'lodash';

function BookletEditTemplate({ bookletEditViewStore }) {
    const {
        contentLoading,
        onRowStatusChange,
        booklet,
        isActiveConfirm,
        certificateStatusIdConfirm,
        saveRowChanges,
        certificateStatusDropdownStore,
        certificateStatuses
    } = bookletEditViewStore;

    let bookletOrder;
    let clean = 0;
    let used = 0;
    let canceled = 0;
    let active = 0;
    if (booklet) {
        bookletOrder = booklet.bookletOrder;

        clean = _.filter(booklet.certificates, { certificateStatus: { abrv: 'clean' } }).length;
        used = _.filter(booklet.certificates, { certificateStatus: { abrv: 'used' } }).length;
        canceled = _.filter(booklet.certificates, { certificateStatus: { abrv: 'canceled' } }).length;
        active = _.filter(booklet.certificates, { isActive: true }).length;
    }

    const isMixedBooklet = booklet && booklet.bookletType.abrv === 'mixed'

    return (
        <ApplicationEditLayout store={bookletEditViewStore}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row">
                        {booklet &&
                            <div className="form__group col col-lrg-3">
                                <strong>Type: </strong>{booklet.bookletType.name}
                                {!isMixedBooklet &&
                                    <span>
                                        {" "}({booklet.certificates[0].denominationType.name})
                                    </span>}
                            </div>}
                        <div className="form__group col col-lrg-2">
                            <strong>Code:</strong> {booklet && booklet.code}
                        </div>
                        <div className="form__group col col-lrg-2">
                            <strong>Count:</strong> {`${clean} / ${used} / ${canceled} | ${active}`}
                        </div>
                        <div className="form__group col col-lrg-2">
                            <strong>Donor: </strong>
                            {booklet && booklet.donor ?
                                <span>{booklet.donor.donorName} {bookletOrder.accountType.name}</span> : 'N/A'}
                        </div>
                        <div className="form__group col col-lrg-3">
                            <strong>Assigned On:</strong> {booklet && booklet.dateAssigned ? moment(booklet.dateAssigned).format('YYYY-MM-DD HH:mm') : 'N/A'}
                        </div>
                        <div className="form__group col col-lrg-2">
                            <BaasicButton
                                className="btn btn--base btn--primary"
                                label='BOOKLET.EDIT.BUTTON.ACTIVE'
                                onClick={() => isActiveConfirm(true)}
                            />
                            <BaasicButton
                                className="btn btn--base btn--secondary u-mar--left--sml"
                                label='BOOKLET.EDIT.BUTTON.INACTIVE'
                                onClick={() => isActiveConfirm(false)}
                            />
                        </div>
                        <div className="form__group col col-lrg-2">
                            <BaasicButton
                                className="btn btn--base btn--primary"
                                label='BOOKLET.EDIT.BUTTON.CLEAN_CERTIFICATE_STATUS'
                                onClick={() => certificateStatusIdConfirm(_.find(certificateStatuses, { abrv: 'clean' }))}
                            />
                            <BaasicButton
                                className="btn btn--base btn--secondary u-mar--left--sml"
                                label='BOOKLET.EDIT.BUTTON.CANCELED_CERTIFICATE_STATUS'
                                onClick={() => certificateStatusIdConfirm(_.find(certificateStatuses, { abrv: 'canceled' }))}
                            />
                        </div>
                    </div>

                    <table className="table w--100">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Certificate Code</th>
                                {isMixedBooklet && <th className="table__head--data">Denomination</th>}
                                <th className="table__head--data">Barcode</th>
                                <th className="table__head--data">Is Active</th>
                                <th className="table__head--data">Status</th>
                                <th className="table__head--data">Note</th>
                                <th className="table__head--data">Actions</th>
                            </tr>
                        </thead>
                        {booklet &&
                            <tbody className="table__body">
                                {_.orderBy(booklet.certificates, ['code'], ['asc']).map(item => {
                                    return <BookletEditRowTemplate
                                        key={item.id}
                                        item={item}
                                        certificateStatusDropdownStore={certificateStatusDropdownStore}
                                        saveRowChanges={saveRowChanges}
                                        onRowStatusChange={onRowStatusChange}
                                        isMixedBooklet={isMixedBooklet} />
                                })}
                            </tbody>}
                    </table>
                </div>
            </Content>
            <PageFooter>
            </PageFooter>
        </ApplicationEditLayout >
    );
}

BookletEditTemplate.propTypes = {
    bookletEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(BookletEditTemplate);
