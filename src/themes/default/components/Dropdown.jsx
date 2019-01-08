import React from 'react';

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

export default Dropdown;