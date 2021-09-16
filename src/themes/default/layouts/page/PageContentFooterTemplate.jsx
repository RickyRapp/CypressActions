import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PageContentFooterTemplate({ children }) {
    return <React.Fragment>{children}</React.Fragment>
}

PageContentFooterTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(PageContentFooterTemplate);