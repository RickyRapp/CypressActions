import React from 'react';
import PropTypes from 'prop-types';
import emptystate from 'themes/assets/img/table-emptystate.svg';

function EmptyMessage({ message }) {
    return (
        <div className='type--center spc--top--lrg spc--bottom--med'>
            <img className='empty--state' src={emptystate} alt='emptystate' />
            <p className='spc--top--sml'>{message}</p>
        </div>
    )
}

EmptyMessage.propTypes = {
    message: PropTypes.string
};

EmptyMessage.defaultProps = {
    message: 'You have not added any data yet.'
}

export default EmptyMessage;