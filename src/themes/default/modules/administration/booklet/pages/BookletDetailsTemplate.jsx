import React from 'react';
import { defaultTemplate, formatDenomination } from 'core/utils';
import { Page } from 'core/layouts';
import { BookletDetailsRowTemplate } from 'themes/modules/administration/booklet/components';
import { BaasicDropdown } from 'core/components';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

function BookletCreateTemplate({ bookletDetailsViewStore }) {
    const {
        booklet,
        loaderStore: { loading },
        denominationTypes,
        accountTypes,
        saveRowChanges,
        certificateStatusDropdownStore,
        cleanCertificateStatusId,
        usedCertificateStatusId,
        canceledCertificateStatusId,
        isActiveConfirm,
        certificateStatusIdConfirm
    } = bookletDetailsViewStore;

    let bookletOrder;
    let clean = 0;
    let used = 0;
    let canceled = 0;
    let active = 0;
    if (booklet) {
        if (booklet.bookletOrderItemBooklets.length > 0) {
            bookletOrder = booklet.bookletOrderItemBooklets[0].bookletOrderItem.bookletOrder;
        }

        clean = _.filter(booklet.certificates, { certificateStatusId: cleanCertificateStatusId }).length;
        used = _.filter(booklet.certificates, { certificateStatusId: usedCertificateStatusId }).length;
        canceled = _.filter(booklet.certificates, { certificateStatusId: canceledCertificateStatusId }).length;
        active = _.filter(booklet.certificates, { isActive: true }).length;
    }

    return (
        <Page loading={loading}>
            {booklet &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-2">
                        <strong>Code:</strong> {booklet.code}
                    </div>
                    <div className="form__group f-col f-col-lrg-2">
                        <strong>Count:</strong> {`${clean} / ${used} / ${canceled} | ${active}`}
                        <span className='icomoon tiny icon-question-circle spc--left--tny' data-tip data-for={'count'} />
                        <ReactTooltip type='info' effect='solid' place="top" id={'count'}>
                            <p>CLEAN / USED / CANCELED | ACTIVE</p>
                        </ReactTooltip>
                    </div>
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Denomination:</strong> {formatDenomination(_.find(denominationTypes, { id: booklet.denominationTypeId }), true)}
                    </div>
                    <div className="form__group f-col f-col-lrg-2">
                        <strong>Donor: {booklet.donorAccount ?
                            <span>{booklet.donorAccount.donorName} {_.find(accountTypes, { id: bookletOrder.accountTypeId }).name}</span> : 'N/A'}
                        </strong>
                    </div>
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Assigned On:</strong> {booklet.dateAssigned ? moment(booklet.dateAssigned).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                    </div>
                    <div className="form__group f-col f-col-lrg-2">
                        <button className="btn btn--sml btn--tertiary spc--right--tny" onClick={() => isActiveConfirm(true)}>
                            <i className="icomoon icon-check-double tiny align--v--baseline spc--right--tny" />
                            <span className="align--v--bottom">
                                Active
                            </span>
                        </button>
                        <button className="btn btn--sml btn--secondary" onClick={() => isActiveConfirm(false)}>
                            <i className="icomoon icon-disable tiny align--v--baseline spc--right--tny" />
                            <span className="align--v--bottom">
                                In Active
                            </span>
                        </button>
                    </div>
                    <div className="form__group f-col f-col-lrg-2">
                        <button className="btn btn--sml btn--tertiary spc--right--tny" onClick={() => certificateStatusIdConfirm(cleanCertificateStatusId)}>
                            <i className="icomoon icon-check-2-empty tiny align--v--baseline spc--right--tny" />
                            <span className="align--v--bottom">
                                Clean
                            </span>
                        </button>
                        <button className="btn btn--sml btn--primary" onClick={() => certificateStatusIdConfirm(canceledCertificateStatusId)}>
                            <i className="icomoon icon-check-2-some tiny align--v--baseline spc--right--tny" />
                            <span className="align--v--bottom">
                                Canceled
                            </span>
                        </button>
                    </div>
                </div>}

            <table className="table w--100">
                <thead className="table__head">
                    <tr>
                        <th className="table__head--data">Certificate Code</th>
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
                            return <BookletDetailsRowTemplate
                                key={item.id}
                                item={item}
                                certificateStatusDropdownStore={certificateStatusDropdownStore}
                                saveRowChanges={saveRowChanges} />
                        })}
                    </tbody>}
            </table>
        </Page>
    );
};

export default defaultTemplate(BookletCreateTemplate);
