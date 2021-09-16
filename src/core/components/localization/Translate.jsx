import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

class Translate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value, t } = this.props;
        return <React.Fragment>{t(value)}</React.Fragment>;
    }
}

Translate.propTypes = {
    value: PropTypes.string.isRequired,
    t: PropTypes.func
};

export default withNamespaces()(Translate);
