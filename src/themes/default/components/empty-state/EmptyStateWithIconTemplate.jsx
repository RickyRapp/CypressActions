import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const EmptyStateVerticalTemplate = function (props) {

    const { className, icon, title, description } = props;
    return (
        <div className={`emptystate--vertical ${className ? className : ""}`}>
            <i className={`u-icon u-icon--empty-state u-icon--empty-state--${icon}`}></i>
            <p className="emptystate__title">{title}</p>
            <p className="emptystate__description">{description}</p>
        </div>
    );
};

EmptyStateVerticalTemplate.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.any,
};

EmptyStateVerticalTemplate.defaultProps = {
    icon: 'icon-add',
};

export default defaultTemplate(EmptyStateVerticalTemplate);
