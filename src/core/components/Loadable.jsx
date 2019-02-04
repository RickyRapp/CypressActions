import React from 'react';
import { Loader } from 'core/components';
import { defaultTemplate } from 'core/utils';

class Loadable extends React.Component {
  componentWillUnmount() {
    this.props.loaderStore.destroy();
  }

  render() {
    const { children, loaderStore } = this.props;

    if (
      loaderStore.loading &&
      (loaderStore.pastDelay === true || loaderStore.initial)
    ) {
      return <Loader />;
    }

    return children;
  }
}

export default defaultTemplate(Loadable);
