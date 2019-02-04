import React from 'react';
import { NotFoundTemplate } from 'themes/modules/root/pages';

class NotFound extends React.Component {
  render() {
    return <NotFoundTemplate {...this.props} />;
  }
}

export default NotFound;
