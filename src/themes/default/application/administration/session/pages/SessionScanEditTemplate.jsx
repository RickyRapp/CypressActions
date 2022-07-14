import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    TableImageCell,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, PageFooter, ApplicationEditLayout } from 'core/layouts';
import _ from "lodash";

const SessionScanEditTemplate = function ({ sessionScanEditViewStore, t }) {

    const {
        contentLoading,
        data,
        openImage,
        saveRowChanges,
        onItemChange,
    } = sessionScanEditViewStore;

    return (
        <ApplicationEditLayout store={sessionScanEditViewStore}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <table className="table w--100 card--primary">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Barcode</th>
                                <th className="table__head--data">Amount</th>
                                <th className="table__head--data">Front Image</th>
                                <th className="table__head--data">Back Image</th>
                                <th className="table__head--data">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {_.orderBy(data, ['code'], ['asc']).map(item=> <TableRow onItemChange={onItemChange} item={item} openImage={openImage} saveRowChanges={saveRowChanges} /> )}
                        </tbody>
                    </table>
                </div>
            </Content>
        <PageFooter>
        </PageFooter>
    </ApplicationEditLayout >
    )
};

function TableRow({ item, openImage, saveRowChanges, onItemChange }) {
    const [ value, setValue ] = useState(item.value);
    const [ barcode, setBarcode ] = useState(item.barcode);

    return <tr>
        <td className="type--center">
            <input
                className="input input--lrg input--text"
                type="number"
                value={barcode || ''}
                onChange={event => setBarcode(event.target.value)} 
            />
        </td>
        <td className="type--center">
            <input
                className="input input--lrg input--text"
                type="number"
                value={value || 0}
                onChange={event => setValue(event.target.value)} 
            />
        </td>
        <td>
            <TableImageCell onClick={openImage} dataItem={item} field={"frontImage"}  />
        </td>
        <td>
            <TableImageCell onClick={openImage} dataItem={item} field={"backImage"}  />
        </td>
        <td className="type--center">
            <BaasicButton
                disabled={value === item.value && barcode === item.barcode}
                className="btn btn--med btn--med--wide btn--primary btn--sml"
                label='BOOKLET.EDIT.BUTTON.SAVE_ROW_CHANGES'
                onClick={() => saveRowChanges({ ...item, value, barcode })}
            />
            <BaasicButton
                disabled={value === item.value && barcode === item.barcode}
                className="btn btn--med btn--med--wide btn--primary btn--sml"
                label='Clear'
                onClick={() => { setBarcode(item.barcode); setValue(item.value); }}
            />
        </td>
    </tr>
}

SessionScanEditTemplate.propTypes = {
    sessionScanEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SessionScanEditTemplate);
