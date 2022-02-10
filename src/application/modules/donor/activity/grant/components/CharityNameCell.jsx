import React from 'react'

const CharityNameCell = ({ data }) => {
    const { dataItem } = data;
    const { charity } = dataItem;
    
    return (
        <td>{charity.name}</td>
    )
}

export default CharityNameCell