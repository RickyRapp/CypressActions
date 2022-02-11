import React from 'react'
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const DescriptionCell = ({ data }) => {
    const { dataItem } = data;
    const { grantPurposeType } = dataItem;
    console.log(data)

    return (
        <td>
            <span data-tip={`${grantPurposeType.name}`} data-type="info" style={{ cursor: 'pointer' }}>
                {grantPurposeType.name}
                <ReactTooltip />
            </span>
        </td>
    )
}

export default DescriptionCell

DescriptionCell.propTypes = {
    data: PropTypes.object,
};