import React from 'react';
import _ from 'lodash';
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

function NavigationTemplate({ title, navigationOptions, breadcrumbs, routerStore, t, overrideDefaultContent, children }) {
    const lastIndex = breadcrumbs.length - 1;
    return !overrideDefaultContent ? (
        <div className='row'>
            <div className='col col-sml-8'>
                <div className='breadcrumbs'>
                    {_.map(breadcrumbs, (breadcrumb, index) => {
                        const isLast = index === lastIndex;
                        const navigate =
                            breadcrumb.route && !isLast
                                ? () => routerStore.goTo(breadcrumb.route)
                                : null;

                        const breadcrumbTitle = t(breadcrumb.title);
                        return (
                            <span className={'breadcrumbs__item' + (!navigate ? ' disabled' : '')} key={index} {...(navigate ? { onClick: navigate } : {})}>
                                {breadcrumbTitle} {isLast ? '' : <span className='icomoon icon-arrow-right-1' /> }
                            </span>
                        );
                    })}
                </div>
                <h2 className='display--ib'>
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
