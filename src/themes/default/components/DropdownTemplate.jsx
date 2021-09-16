import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ items, onSelect, value }) {
    return (
        <select value={value} onChange={(e) => onSelect(e.target.value)}>
            {
                items.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })
            }
        </select>
    )
}

Dropdown.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func,
    value: PropTypes.any
};

export default Dropdown;