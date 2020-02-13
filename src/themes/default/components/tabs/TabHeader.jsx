import React from 'react';
import PropTypes from 'prop-types';

const TabHeader = ({ onClick, label, isActive, t }) => {
    return (
        <a className={'u-mar--right--sml tabs--primary__item' + (isActive ? ' active' : '')} href='#' onClick={onClick}>{t(label)}</a>
    )
}

TabHeader.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    isActive: PropTypes.bool,
    t: PropTypes.func
};

export default TabHeader;
