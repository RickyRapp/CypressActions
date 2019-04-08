import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { Navigation } from 'core/components';
import { TabMenuLayout } from 'core/layouts';

const PageNavigationTemplate = function ({ title, hideNavigation, children }) {

  return (
    <div className="content__header">
      <Navigation title={title} overrideDefaultContent={hideNavigation}>
        {children}
      </Navigation>
    </div>
  );
};

PageNavigationTemplate.propTypes = {
  title: PropTypes.string,
  hideNavigation: PropTypes.bool
};

PageNavigationTemplate.defaultProps = {
  hideNavigation: false
};

export default defaultTemplate(PageNavigationTemplate);
