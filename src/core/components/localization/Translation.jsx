import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {TranslationTemplate} from "themes/components";

@observer
class Translation extends Component {
    render() {
        return (
            <TranslationTemplate {...this.props} />
        );
    }
}

Translation.propTypes = {
    store: PropTypes.object.isRequired
};

export default Translation;
