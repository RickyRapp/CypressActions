import React from 'react'
import PropTypes from 'prop-types';
import { Tooltip } from '@progress/kendo-react-tooltip';

const CharityNameCell = ({ data }) => {
    const { dataItem } = data;
    const { charity } = dataItem;

    return (
        <td>
            <Tooltip anchorElement="target" position="top">
                <span style={{ cursor: 'pointer' }} title={charity.name}>{charity.name}</span>
            </Tooltip>
        </td>
    )
}

export default CharityNameCell

CharityNameCell.propTypes = {
    data: PropTypes.object,
};