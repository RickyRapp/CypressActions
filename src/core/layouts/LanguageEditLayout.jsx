import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { LanguageEditLayoutTemplate } from 'themes/layouts';

@observer
class LanguageEditLayout extends Component {
  render() {
    return <LanguageEditLayoutTemplate {...this.props} />;
  }
}

LanguageEditLayout.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  loaderStore: PropTypes.object,
  routeBack: PropTypes.func
};

export default LanguageEditLayout;
