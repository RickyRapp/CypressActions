import React from 'react';
import ReactTooltip from 'react-tooltip'
import moment from 'moment';
import _ from 'lodash';

const renderGrantPurposeType = (item, grantPurposeTypeModels) => {
    let base = _.find(grantPurposeTypeModels, { id: item.grantPurposeTypeId }).name;

    if (item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'in-memory-of' }).id ||
        item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'in-honor-of' }).id ||
        item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'sponsor-a-friend' }).id) {
        return (
            <React.Fragment>
                {base}
                <span className='icomoon icon-alert-circle' data-tip data-for={`purpose_${item.id}`} />
                <ReactTooltip type='info' effect='solid' id={`purpose_${item.id}`}>
                    <span>{item.grantPurposeMemberName}</span>
                </ReactTooltip>
            </React.Fragment>);
    }
    else if (item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'other' }).id)
        return (
            <React.Fragment>
                {base}
                <span className='icomoon icon-alert-circle' data-tip data-for={`purpose_${item.id}`} />
                <ReactTooltip type='info' effect='solid' id={`purpose_${item.id}`}>
                    <span>{item.additionalInformation}</span>
                </ReactTooltip>
            </React.Fragment>);
    else if (item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'charity-event' }).id)
        return (
            <React.Fragment>
                {base}
                <span className='icomoon icon-alert-circle' data-tip data-for={`purpose_${item.id}`} />
                <ReactTooltip type='info' effect='solid' id={`purpose_${item.id}`}>
                    <span>{item.charityEventAttending ? 'Attending' : 'Not Attending'}</span>
                </ReactTooltip>
            </React.Fragment>);
    else
        return base;
}

const renderGrantScheduleType = (item, grantScheduleTypeModels) => {
    let base = _.find(grantScheduleTypeModels, { id: item.grantScheduleTypeId }).name;

    if (item.grantScheduleTypeId === _.find(grantScheduleTypeModels, { abrv: 'one-time' }).id) {
        return base;
    }
    else if (item.grantScheduleTypeId === _.find(grantScheduleTypeModels, { abrv: 'monthly' }).id || item.grantScheduleTypeId === _.find(grantScheduleTypeModels, { abrv: 'annual' }).id) {
        let scheduleTypeDescription = null;
        if (item.endDate) {
            scheduleTypeDescription = `End Date: ${moment(item.endDate).format('YYYY-MM-DD')}`;
        }
        else if (item.noEndDate === true) {
            scheduleTypeDescription = 'Ongoing';
        }
        else {
            scheduleTypeDescription = `Number Of Payments: ${item.remainingNumberOfPayments}/${item.numberOfPayments}`;
        }
        return `${base} - ${scheduleTypeDescription}`;
    }

    return base;
}

export { renderGrantPurposeType, renderGrantScheduleType };