import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ExportTemplate } from 'themes/components'
import { setCurrentView } from "core/utils";
import { ExportViewStore } from 'core/stores';

@setCurrentView((rootStore, componentProps) => new ExportViewStore(rootStore, componentProps), 'store')
@observer
class Export extends React.Component {
    render() {
        return <ExportTemplate {...this.props} />
    }
}

Export.propTypes = {
    config: PropTypes.object.isRequired
};

export default Export;
