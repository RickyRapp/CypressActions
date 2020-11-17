import React from 'react';
import { TableViewStore } from 'core/stores';
import PropTypes from 'prop-types';
import { SimpleBaasicTable, Date } from 'core/components'
import { defaultTemplate } from 'core/hoc';

const SessionDetailTemplate = function ({ item }) {
    const tableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'code',
                title: 'SESSION.EDIT.LIST.COLUMNS.CODE_LABEL',
                format: {
                    type: 'function',
                    value: (item) => { return `${item.certificate.booklet.code}-${item.certificate.code}`; }
                }
            },
            {
                key: 'certificate.barcode',
                title: 'SESSION.EDIT.LIST.COLUMNS.BARCODE_LABEL',
            },
            {
                key: 'certificate.booklet.denominationType',
                title: 'SESSION.EDIT.LIST.COLUMNS.DENOMINATION_LABEL',
                format: {
                    type: 'denomination',
                    value: 'short',
                    additionalField: 'blankCertificateValue'
                }
            },
            {
                key: 'amountAfterDeduction',
                title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL',
                format: {
                    type: 'currency'
                }
            }
        ]
    });

    tableStore.setData(item.sessionCertificates)

    return (
        <React.Fragment>
            <div className="row u-mar--bottom--lrg">
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">Organization Name/Email/Tax ID</label>
                    <span className={"input input--lrg input--text input--disabled"}>
                        {item.charityName} / {item.charityEmail || '-'} / {item.taxId || '-'}
                    </span>
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">Full name</label>
                    <span className={"input input--lrg input--text input--disabled"}>
                        {item.fullName}
                    </span>
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">Phone number</label>
                    <span className={"input input--lrg input--text input--disabled"}>
                        {item.phoneNumber}
                    </span>
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">Email</label>
                    <span className={"input input--lrg input--text input--disabled"}>
                        {item.email}
                    </span>
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <div>
                        <label className="form__group__label">Confirmation Number</label>
                        <span className={"input input--lrg input--text input--disabled"}>{item.confirmationNumber}</span>
                    </div>
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <div>
                        <label className="form__group__label">Created on</label>
                        <span className={"input input--lrg input--text input--disabled"}><Date format="full" value={item.dateCreated} /></span>
                    </div>
                </div>
            </div>
            <SimpleBaasicTable
                tableStore={tableStore}
                style={{ height: '300px' }}
            />
        </React.Fragment >
    )
};

SessionDetailTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SessionDetailTemplate);
