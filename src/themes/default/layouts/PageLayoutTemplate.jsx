import React from 'react';
import PropTypes from 'prop-types';
import {  PageNavigation, Content } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';

const PageLayoutTemplate = function ({
    title,
    children,
    emptyRenderer
}) {

    return (
        <Content emptyRenderer={emptyRenderer} >
            <div className='container'>
                {/*TODO: insert page header?*/}
                <PageNavigation></PageNavigation>
                {title}

                {/* TODO: give parent route name? */}
                
                {children}
            </div>
        </Content>
    );
};

PageLayoutTemplate.propTypes = {
   store: PropTypes.any,
   title: PropTypes.string,
   children: PropTypes.any,
   emptyRenderer: PropTypes.any,
   t: PropTypes.func
};

export default defaultTemplate(PageLayoutTemplate);
