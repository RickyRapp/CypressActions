import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BaasicSideselectTemplate} from "themes/components";

class BaasicSideselect extends Component {
    render() {
        const { children, ...props } = this.props;

        return (
            <BaasicSideselectTemplate {...props}>
                {children}
            </BaasicSideselectTemplate>
        );
    }
}

BaasicSideselect.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.object,
    onSelect: PropTypes.func,
    labelKey: PropTypes.string,
    children: PropTypes.any
};

export default BaasicSideselect;
