import React from 'react'
import PropTypes from 'prop-types';
import { Tooltip } from '@progress/kendo-react-tooltip';

const DescriptionCell = ({ desc }) => {
    return (
        <td>
            <Tooltip anchorElement="target" position="top">
                <span style={{ cursor: 'pointer' }} title={desc}>{desc}</span>
            </Tooltip>
        </td>
    )
}

export default DescriptionCell

DescriptionCell.propTypes = {
    data: PropTypes.object,
};