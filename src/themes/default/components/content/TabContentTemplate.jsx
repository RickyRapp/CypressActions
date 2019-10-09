import React from 'react';
import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import {Content} from 'core/layouts'
import { Loader } from 'core/components';
import { getPageObject } from 'core/utils';

function TabContentTemplate({
    loading = false,
    empty = true,
    loaderRenderer = () => <Loader />,
    emptyRenderer = null,
    children
}) {
    //if (error) return <ErrorComponent />;
    if (loading) return render(loaderRenderer);
    
    if (emptyRenderer == null || !empty) return <MainContent>{children}</MainContent>;
    return render(emptyRenderer);
}

TabContentTemplate.propTypes = {
    loading: PropTypes.bool,
    empty: PropTypes.bool,
    loaderRenderer: PropTypes.any,
    emptyRenderer: PropTypes.any,
    children: PropTypes.any,
    t: PropTypes.func
 };

function render(content) {
    return content ? (typeof content === 'function' ? content() : content) : null;
}

const MainContent = defaultTemplate(({ children, loading, isError, empty=false, emptyRenderer=null}) => {    
    const { header, footer, content } = getPageObject(children);
    return (
        <React.Fragment>
            {/* can't wrap header and footer in Content so hide them while loading (because loader needs content__main as parent) */}
            <div className='content__main'>
                <Content isError={isError} empty={empty} emptyRenderer={emptyRenderer}
                        loading={loading}> {/*when loading main content don't show empty (for now)*/}
                        
                {content.sidebar}
                <div className='content__main__content'>
                        <div className='content'>
                            {
                                header &&
                                <div className='content__header'>
                                    {header}
                                </div>
                            }

                            <div className='content__main'>
                                <div className='content__main__content'>
                                    <div className='padd--sml'>
                                        {content.children}
                                    </div>
                                </div>
                            </div>

                            {
                                footer &&
                                <div>
                                    {footer}
                                </div>
                            }
                        </div>
                    </div>
                </Content>
            </div>
        </React.Fragment>
    )
});

export default defaultTemplate(TabContentTemplate);
