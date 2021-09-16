import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function ListContentTemplate({ children }) {
    return <React.Fragment>{shouldRenderContentChildren(children) ? children : <React.Fragment>{children}</React.Fragment>}</React.Fragment>;
}

ListContentTemplate.propTypes = {
    children: PropTypes.any,
};

export default defaultTemplate(ListContentTemplate);
