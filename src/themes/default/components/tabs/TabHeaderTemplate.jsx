import React from 'react';
import PropTypes from 'prop-types';

const TabHeader = ({ onClick, label, isActive, t }) => {
    return (
        <a
            className={'tabs--primary__item u-mar--right--med' + (isActive ? ' active' : '')}
            onClick={e => {
                onClick(e);
                e.preventDefault();
            }}
        >
            {t(label)}
        </a>
    );
};

TabHeader.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    isActive: PropTypes.bool,
    t: PropTypes.func,
};

export default TabHeader;
