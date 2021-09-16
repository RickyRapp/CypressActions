import React from 'react';
import { PropTypes } from 'prop-types';
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
        const {
            error,
            info
        } = this.state;

        if (error) {
            /* eslint-disable */
            console.log("Error: " + error);
            console.log("Info: " + info);
            /* eslint-enable */
            return <ErrorBoundaryTemplate error={error} info={info} />
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
}

export default ErrorBoundary;