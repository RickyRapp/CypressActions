import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PageContentSidebarTemplate({ children, contentSidebarVisible, toggleContentSidebarVisibility }) {
    return (
        <React.Fragment>
            <div
                className={
                    'content__main__aside' + (contentSidebarVisible ? '' : ' is-collapsed')
                }
            >
                {children}
            </div>
            <button
                className='content__main__aside__action'
                onClick={() => toggleContentSidebarVisibility()}
            >
                <span className={'icomoon treeview icon-arrow-button-right-1' + (contentSidebarVisible ? '' : ' is-collapsed')}/>
            </button>
        </React.Fragment>
    );
}

PageContentSidebarTemplate.propTypes = {
    children: PropTypes.any,
    contentSidebarVisible: PropTypes.bool,
    toggleContentSidebarVisibility: PropTypes.func
};

export default defaultTemplate(PageContentSidebarTemplate);
