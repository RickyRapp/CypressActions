import React from 'react';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

const renderGrantPurposeType = (item, grantPurposeTypeModels) => {
    let base = _.find(grantPurposeTypeModels, { id: item.grantPurposeTypeId }).name;

    if (item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'in-memory-of' }).id ||
        item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'in-honor-of' }).id ||
        item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'sponsor-a-friend' }).id) {
        return (
            <React.Fragment>
                {base}
                <span className='icomoon medium icon-cog' data-tip data-for={`purpose_${item.id}`} />
                <ReactTooltip type='info' effect='solid' place="right" id={`purpose_${item.id}`}>
                    <span>{`${item.grantPurposeMember.firstName} ${item.grantPurposeMember.lastName}`}</span>
                </ReactTooltip>
            </React.Fragment>);
    }
    else if (item.grantPurposeTypeId === _.find(grantPurposeTypeModels, { abrv: 'other' }).id)
        return (
            <React.Fragment>
                {base}
                <span className='icomoon medium icon-cog' data-tip data-for={`purpose_${item.id}`} />
                <ReactTooltip type='info' effect='solid' place="right" id={`purpose_${item.id}`}>
                    <span>{item.additionalInformation}</span>
                </ReactTooltip>
            </React.Fragment>);
    else
        return base;
}

export { renderGrantPurposeType };