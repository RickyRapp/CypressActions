import React from 'react';
import { ApplicationDefaultSettingEditTemplate } from 'themes/application/administration/application-default-setting/pages';
import { observer } from 'mobx-react';
import { ApplicationDefaultSettingEditViewStore } from 'application/administration/application-default-setting/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new ApplicationDefaultSettingEditViewStore(rootStore), 'applicationDefaultSettingEditViewStore')
@observer
class ApplicationDefaultSettingEdit extends React.Component {
    render() {
        return <ApplicationDefaultSettingEditTemplate {...this.props} />
    }
}

export default ApplicationDefaultSettingEdit;