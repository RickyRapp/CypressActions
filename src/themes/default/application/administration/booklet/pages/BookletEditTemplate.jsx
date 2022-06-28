import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CertificateEditRowTemplate } from 'themes/application/administration/booklet/components';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BaasicButton, Date } from 'core/components';
import _ from 'lodash';
import { isSome } from 'core/utils';
import moment from 'moment';

function BookletEditTemplate({ bookletEditViewStore }) {
    const {
        contentLoading,
        onRowStatusChange,
        booklet,
        isActiveConfirm,
        saveRowChanges,
        onSetCleanStatusClick,
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
                            <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                                <strong>Type: </strong>{booklet.bookletType.name}
                                {!isMixedBooklet &&
                                    <span>
                                        {" "}({booklet.certificates[0].denominationType.name})
                                    </span>}
                            </div>}
                        <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                            <strong>Code:</strong> {booklet && booklet.code}
                        </div>
                        <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                            <strong>Count:</strong> {`${clean} / ${used} / ${canceled} | ${active}`}
                        </div>
                        <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                            <strong>Donor: </strong>
                            {bookletOrder ?
                                <span>{bookletOrder.donor.donorName}  <br /> </span> : 'N/A'}
                        </div>
                        <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                            <strong>Pre Paid: </strong>
                            {booklet && isSome(booklet.isPrePaid) ?
                                <span>{booklet.isPrePaid ? 'Yes' : 'No'}</span> : 'N/A'}
                        </div>
                        <div className="form__group col col-sml-12 col-med-6 col-xlrg-3">
                            <strong>Fee paid by: </strong>
                            {booklet && isSome(booklet.isSessionFeePayedByCharity) ?
                                <span>{booklet.isSessionFeePayedByCharity ? 'Charity' : 'Donor'}</span> : 'N/A'}
                        </div>
                        <div className="form__group col col-lrg-3">
                            <strong>Assigned On:</strong> {booklet && booklet.dateAssigned ? <Date value={booklet.dateAssigned} format='full' /> : 'N/A'}
                        </div>
                        <div className="form__group col col-lrg-3">
                            <strong>Expiration Date:</strong> {booklet && booklet.bookletOrder && booklet.bookletOrder.expirationDays > 0 ? <Date value={moment(booklet.bookletOrder.dateCreated, "YYYY-MM-DD").add(booklet.bookletOrder.expirationDays, 'days')} format='short' /> : 'N/A'}
                        </div>
                    </div>
                    <div className="u-display--f u-mar--bottom--sml">
                        <BaasicButton
                            className="btn btn--base btn--primary u-mar--bottom--sml"
                            label='BOOKLET.EDIT.BUTTON.ACTIVE'
                            onClick={() => isActiveConfirm(true)}
                        />
                        <BaasicButton
                            className="btn btn--base btn--secondary u-mar--left--sml u-mar--right--sml u-mar--bottom--sml"
                            label='BOOKLET.EDIT.BUTTON.INACTIVE'
                            onClick={() => isActiveConfirm(false)}
                        />
                        <BaasicButton
                            className="btn btn--base btn--ghost u-mar--bottom--sml"
                            label='BOOKLET.EDIT.BUTTON.CLEAN_CERTIFICATE_STATUS'
                            onClick={onSetCleanStatusClick}
                        />
                    </div>

                    <table className="table w--100 card--primary">
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
                        <tbody className="table__body">
                            {_.orderBy(booklet && booklet.certificates, ['code'], ['asc']).map(item => {
                                return <CertificateEditRowTemplate
                                    key={`${item.id}_${item.dateUpdated}`}
                                    item={item}
                                    certificateStatuses={certificateStatuses}
                                    saveRowChanges={saveRowChanges}
                                    onRowStatusChange={onRowStatusChange}
                                    isMixedBooklet={isMixedBooklet} />
                            })}
                        </tbody>
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
