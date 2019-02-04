import React from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { ContentFooterTemplate } from 'themes/components';

function ContentFooter(props) {
  return <ContentFooterTemplate {...props} />;
}

export default ContentFooter;
