import React from 'react';
import { BasicInput } from 'core/components';

function ChaseQuickPayTemplate({ form }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('transactionId')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('memo')} />
            </div>
        </div>
    );
}

export default ChaseQuickPayTemplate;


