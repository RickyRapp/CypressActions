import React from 'react';
import PropTypes from 'prop-types';
import 'themes/styles/public.css';

function PublicLayoutTemplate({ render, rootStore, ...props }) {
    return (
        <main>
            {render(props)}
        </main>
    )
}

PublicLayoutTemplate.propTypes = {
    render: PropTypes.func,
    rootStore: PropTypes.object.isRequired

}

export default PublicLayoutTemplate;