import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PageContentHeaderTemplate({ children }) {
    return <React.Fragment>{children}</React.Fragment>
}

PageContentHeaderTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(PageContentHeaderTemplate);