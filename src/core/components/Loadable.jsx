import React from "react";
import { observer } from "mobx-react";
import PropTypes from 'prop-types';

import { Loader } from "core/components";

@observer
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
        
        return typeof children === 'function' ? children() : children;
    }
}

Loadable.propTypes = {
    loaderStore: PropTypes.object,
    children: PropTypes.any
 };

export default Loadable;
