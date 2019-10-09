import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Navigation } from 'core/components';

const PageNavigationTemplate = function ({ title, hideNavigation, children }) {
    return(
        <div className='content__header'>
            <Navigation title={title} overrideDefaultContent={hideNavigation}>
                {children}
            </Navigation>
        </div>
    )
};

PageNavigationTemplate.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    hideNavigation: PropTypes.bool
};

PageNavigationTemplate.defaultProps = {
    hideNavigation: false
};

export default defaultTemplate(PageNavigationTemplate);
