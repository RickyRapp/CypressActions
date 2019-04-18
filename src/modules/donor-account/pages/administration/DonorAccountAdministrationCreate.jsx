import React from 'react';
import { observer } from 'mobx-react';
import { Page } from 'core/layouts';
import { DonorAccountAdministrationCreateTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountAdministrationCreateViewStore } from 'modules/donor-account/stores'

@setCurrentView(rootStore => new DonorAccountAdministrationCreateViewStore(rootStore), 'donorAccountAdministrationCreateViewStore')
@observer
class DonorAccountAdministrationCreate extends React.Component {

    render() {
        return (
            <DonorAccountAdministrationCreateTemplate {...this.props} />
        )
    }
}


export default DonorAccountAdministrationCreate;