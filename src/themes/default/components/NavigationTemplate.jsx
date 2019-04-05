import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';

function NavigationTemplate({
  title,
  breadcrumbs,
  routerStore,
  t,
  overrideDefaultContent,
  children
}) {
  const lastIndex = breadcrumbs.length - 1;
  return !overrideDefaultContent ? (
    <div className="f-row">
      <div className="f-col f-col-lrg-8">
        <h5 className="display--ib spc--top--sml">{t(title)}</h5>
        <div className="breadcrumbs">
          {_.map(breadcrumbs, (breadcrumb, index) => {
            const isLast = index === lastIndex;
            const navigate =
              breadcrumb.route && !isLast
                ? () => routerStore.goTo(breadcrumb.route)
                : null;

            const breadcrumbTitle = t(breadcrumb.title);
            return (
              <span
                className={'breadcrumbs__item' + (!navigate ? ' disabled' : '')}
                key={index}
                {...(navigate ? { onClick: navigate } : {})}
              >
                {breadcrumbTitle}{' '}
                {isLast ? '' : <span className="icomoon icon-arrow-right-1" />}
              </span>
            );
          })}
        </div>
      </div>
      {children ? (
        <div className="f-col f-col-lrg-4">
          {renderChildren(children)}
        </div>
      ) : null}
    </div>
  ) : (
      renderChildren(children)
    );
}

function renderChildren(children) {
  return typeof children === 'function' ? children() : children;
}

NavigationTemplate.propTypes = {
  overrideDefaultContent: PropTypes.bool
};

NavigationTemplate.defaultProps = {
  overrideDefaultContent: false
};

export default defaultTemplate(NavigationTemplate);
