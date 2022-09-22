import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const NavigationOptions = defaultTemplate(({ options, t }) => {
    if (!options) {
        return null;
    }

    if (options.loading) {
        return (
            <span className='display--ib spc--left--tny align--v--text-top'>
                <i className='icomoon icon-synchronize-arrows-1 rotate' />
            </span>
        )
    }

    if (options.title && options.title !== '') {
        return <span className='type--wgt--regular'>: {t(options.title)}</span>
    }

    return null;
});

function NavigationTemplate({ title, navigationOptions, breadcrumbs, routerStore, t, overrideDefaultContent, children }) { // eslint-disable-line
    return !overrideDefaultContent ? (
        <React.Fragment>
            <div className="content__header">
                <div className="row">
                    <div className='col col-sml-8 u-mar--bottom--med'>
                        <h2 className="">
                            {t(title)}

                            <NavigationOptions options={navigationOptions} />
                        </h2>
                    </div>
                    {children ?
                        <div className="col col-sml-4 type--right">
                            {renderChildren(children)}
                        </div> : null
                    }
                </div>
            </div>
        </React.Fragment>
    ) : renderChildren(children);
}

function renderChildren(children) {
    return typeof children === 'function' ? children() : children;
}

NavigationTemplate.propTypes = {
    title: PropTypes.string,
    navigationOptions: PropTypes.object,
    breadcrumbs: PropTypes.array,
    routerStore: PropTypes.object,
    t: PropTypes.func,
    children: PropTypes.any,
    overrideDefaultContent: PropTypes.bool
};

NavigationTemplate.defaultProps = {
    overrideDefaultContent: false,
};

export default defaultTemplate(NavigationTemplate);
