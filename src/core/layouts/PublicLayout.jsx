import React from 'react';
import PropTypes from 'prop-types';
import { PublicLayoutTemplate } from 'themes/layouts';

function PublicLayout(props) {
    return <PublicLayoutTemplate {...props} />
}

PublicLayout.propTypes = {
    render: PropTypes.func
}

export default PublicLayout;