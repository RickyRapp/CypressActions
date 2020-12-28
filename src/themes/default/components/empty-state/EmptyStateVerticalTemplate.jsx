import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const EmptyStateVerticalTemplate = function (props) {

    const { className } = props;
    return (
        <div className={`${className}`}>
            <p className="type--sml type--wgt--bold type--color--opaque">No activity yet.</p>
        </div>
    );
};

EmptyStateVerticalTemplate.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    actionLabel: PropTypes.string,
    className: PropTypes.string,
    callToAction: PropTypes.func,
    callToActionLabel: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.any,
};

EmptyStateVerticalTemplate.defaultProps = {
    icon: 'icon-add',
};

export default defaultTemplate(EmptyStateVerticalTemplate);
