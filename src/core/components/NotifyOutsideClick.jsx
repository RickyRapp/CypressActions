import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class NotifyOutsideClick extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (_.isFunction(this.props.action))
        this.props.action();
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

NotifyOutsideClick.propTypes = {
  // children: PropTypes.element.isRequired,
  action: PropTypes.func
};

export default NotifyOutsideClick;
