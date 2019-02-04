import React from 'react';
import { ErrorBoundaryTemplate } from 'themes/components';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      error,
      info
    });
  }

  render() {
    const { error, info } = this.state;

    if (error) {
      console.log('Error: ' + error);
      console.log('Info: ' + info);
      return <ErrorBoundaryTemplate error={error} info={info} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
