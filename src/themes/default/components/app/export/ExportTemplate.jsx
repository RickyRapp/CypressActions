import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicDropdown } from 'core/components';

function ExportTemplate({ onClick, exportFieldStore, exportLimitStore }) {
    return (
        <React.Fragment>
            <div className="f-row">
                <div className="f-col f-col-sml-1">
                    <button className="btn btn--primary btn--med btn--rounded align--v-initial" onChange={onClick} onClick={onClick}>Export</button>
                </div>
                <div className="f-col f-col-sml-2">
                    <div className="inputgroup">
                        <label>Export Limits</label>
                        <BaasicDropdown store={exportLimitStore} />
                    </div>
                </div>
                <div className="f-col f-col-sml-9">
                    <div className="inputgroup">
                        <label>Export Fields</label>
                        <BaasicDropdown store={exportFieldStore} />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default defaultTemplate(ExportTemplate);
