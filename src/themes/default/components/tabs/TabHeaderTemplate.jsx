import React from 'react';
import PropTypes from 'prop-types';

const TabHeader = ({ onClick, label, isActive, t, activeClassName }) => {
    let additionalClass = label === 'CHARITY_ACTIVITY.OUR_WALLET' || label === 'CHARITY_ACTIVITY.GRANTS' ? ' tabs--primary__item--enh' : '';

    return (
        <a
            className={`${activeClassName ? activeClassName : 'tabs--primary__item' + additionalClass}` + (isActive ? ' active' : '')}
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
    activeClassName: PropTypes.string,
};

export default TabHeader;
