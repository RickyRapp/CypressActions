import React from 'react';
import { NotFoundTemplate } from 'themes/modules/common/root/pages';

class NotFound extends React.Component {
  render() {
    return <NotFoundTemplate {...this.props} />;
  }
}

export default NotFound;
