import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    TableImageCell,
    BasicCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, PageFooter, ApplicationEditLayout } from 'core/layouts';
import _ from "lodash";

const SessionScanEditTemplate = function ({ sessionScanEditViewStore, t }) {

    const {
        loaderStore,
        data,
        openImage,
        hasDirtyItems,
        isEdit,
        saveChanges,
        onItemChange,
    } = sessionScanEditViewStore;

    return (
        <ApplicationEditLayout store={sessionScanEditViewStore}>
            <Content loading={loaderStore.loading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <table className="table w--100 card--primary">
                        <thead className="table__head">
                            <tr>
                                <th className="table__head--data">Barcode</th>
                                <th className="table__head--data">Amount</th>
                                <th className="table__head--data">Front Image</th>
                                <th className="table__head--data">Back Image</th>
                                <th className="table__head--data">Valid</th>
                                {/* <th className="table__head--data">Approved</th> */}
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {_.orderBy(data, ['dateCreated'], ['asc']).map(item => <TableRow key={item.id} onItemChange={onItemChange} item={item} isEdit={isEdit} openImage={openImage} /> )}
                        </tbody>
                    </table>
                </div>
            </Content>
        <PageFooter>
            {isEdit && 
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--primary"
                    label='Save'
                    onClick={() => saveChanges()}
                />}
        </PageFooter>
    </ApplicationEditLayout >
    )
};

function TableRow({ item, openImage, onItemChange, isEdit }) {
    return (
    <tr style={{ height: 50 }}>
        <td className="type--center">
            {isEdit ? 
            <input
                className="input input--lrg input--text"
                type="text"
                value={item.barcode || ''}
                onChange={event => onItemChange(event, item, "barcode")} 
            /> : <span>{item.barcode || ""}</span>}
        </td>

        <td className="type--center">
            {isEdit ? <input
                className="input input--lrg input--text"
                type="text"
                value={item.value || 0}
                onChange={event => onItemChange(event, item, "value")} 
            /> : <span>{item.value || 0}</span>}
        </td>

        <TableImageCell onClick={openImage} dataItem={item} field={"frontImage"}  />
        <TableImageCell onClick={openImage} dataItem={item} field={"backImage"}  />

        <td className="type--center">
            <BasicCheckbox
                id={item.id}
                checked={item.isValid}
                disabled={true}
            />
        </td>
{/* 
        <td className="type--center">
            <BasicCheckbox
                id={item.id}
                checked={item.isApproved}
                disabled={true}
            />
        </td> */}
    </tr>)
}

TableRow.propTypes = {
    item: PropTypes.object,
    openImage: PropTypes.func,
    onItemChange: PropTypes.func,
    isEdit: PropTypes.bool,
};

SessionScanEditTemplate.propTypes = {
    sessionScanEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(SessionScanEditTemplate);
