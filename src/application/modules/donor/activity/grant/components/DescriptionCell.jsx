import React from 'react'
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const DescriptionCell = ({ desc }) => {
    return (
        <td>
            <span data-tip={`${desc}`} data-type="info" style={{ cursor: 'pointer' }}>
                {desc}
                <ReactTooltip />
            </span>
        </td>
    )
}

export default DescriptionCell

DescriptionCell.propTypes = {
    data: PropTypes.object,
};