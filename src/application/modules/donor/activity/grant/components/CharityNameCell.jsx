import React from 'react'
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const CharityNameCell = ({ data }) => {
    const { dataItem } = data;
    const { charity } = dataItem;

    return (
        <td>
            <span data-tip={`${charity.name}`} data-type="info" style={{ cursor: 'pointer' }}>
                {charity.name}
                <ReactTooltip />
            </span>
        </td>
    )
}

export default CharityNameCell

CharityNameCell.propTypes = {
    data: PropTypes.object,
};