import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EmptyStateHorizontalTemplate,
  EmptyStateVerticalTemplate
} from 'themes/components/empty-state';

class EmptyState extends Component {
  render() {
    const { type, ...otherProps } = this.props;
    return type === 'horizonzal' ? (
      <EmptyStateHorizontalTemplate {...otherProps} />
    ) : (
      <EmptyStateVerticalTemplate {...otherProps} />
    );
  }
}

EmptyState.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  callToAction: PropTypes.func,
  callToActionLabel: PropTypes.string
};

EmptyState.defaultProps = {
  type: 'horizontal'
};

export default EmptyState;
