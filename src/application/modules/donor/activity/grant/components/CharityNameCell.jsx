import React from 'react'
import PropTypes from 'prop-types';

const CharityNameCell = ({ data }) => {
    const { dataItem } = data;
    const { charity } = dataItem;

    return (
        <td title={charity.name}>
            <span>{charity.name}</span>
        </td>
    )
}

export default CharityNameCell

CharityNameCell.propTypes = {
	data: PropTypes.object,
};