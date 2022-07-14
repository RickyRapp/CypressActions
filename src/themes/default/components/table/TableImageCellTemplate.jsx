import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Popup } from '@progress/kendo-react-popup';

const TableImageCellTemplate = function (props) {
    const [ image, setImage ] = useState(null);
    const anchor = useRef(null);

    const { dataItem, field, onClick } = props;

    const id = field === "frontImage" ? dataItem.mediaGalleryReview[0].id : dataItem.mediaGalleryReview[1].id;

    const onMouseEnter = async () => {
        const response = await onClick(id);
        setImage(response);
    }

    const onMouseLeave = () => {
        setImage(null);
    }

    return (
        <td 
            className="type--center"
        >
            <span 
                ref={anchor}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave} 
                style={{ backgroundColor: "blue", width: 40, height: 40, color: "white", padding: 5, cursor: "pointer" }}>
                Image
            </span>

            <Popup popupAlign={{ horizontal: "right", vertical: "top" }} anchorAlign={{ horizontal: "left", vertical: "bottom" }} anchor={anchor.current} show={image != null} className="k-dropdown--header" /* offset={offset} */ animate={false}>
                <img 
                    style={{ backgroundColor: "white", border: "1px solid black" }} 
                    width={450} 
                    height={300} 
                    src={image} 
                    alt="" 
                />
            </Popup>
            
        </td>)
};

TableImageCellTemplate.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string
};

export default TableImageCellTemplate;
