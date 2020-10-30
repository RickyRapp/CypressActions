import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';

const EmptyStateTemplate = function ({ title, message, children }) {
    return (
        <div className='card card--primary card--med display--ib'>
            <div className='type--color--primary spc--bottom--sml'>
                <span className='icomoon icon-alert-circle spc--right--tny align--v--text-top' />
                <h5 className='display--ib'>{title}</h5>
            </div>
            <div className='padd--left--med'>
                { children ? children : <p>{message}</p> }
            </div>
        </div>
    )
};

EmptyStateTemplate.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.any
};

EmptyStateTemplate.defaultProps = {
    title: 'No data',
    message: ''
};

export default defaultTemplate(EmptyStateTemplate);
