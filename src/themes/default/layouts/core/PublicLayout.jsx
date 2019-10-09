import React from 'react';
import PropTypes from 'prop-types';

function PublicLayoutTemplate({ render, ...props }) {
    return (
        <main>
            {render(props)}
        </main>
    )
}

PublicLayoutTemplate.propTypes = {
    render: PropTypes.func
}

export default PublicLayoutTemplate;