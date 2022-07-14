import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TableImageCellTemplate = function (props) {
    const [ image, setImage ] = useState(null);

    const { dataItem, field, onClick } = props;

    const id = field === "frontImage" ? dataItem.mediaGalleryReview[0].id : dataItem.mediaGalleryReview[1].id;
    
    return (
        <td onMouseLeave={() => setImage(null)} onMouseOver={async () => {
            const response = await onClick(id);
            setImage(response);
        }}>
            Image
            {image && <img width={200} height={200} src={image} alt="" />}
            {image && <a href={image} target="_blank">&#x21E9; Blank Certificate</a>}
        </td>)
};

TableImageCellTemplate.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string
};

export default TableImageCellTemplate;
