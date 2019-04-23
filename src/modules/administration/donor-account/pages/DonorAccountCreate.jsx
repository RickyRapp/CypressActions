import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountCreateTemplate } from 'themes/modules/administration/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountCreateViewStore } from 'modules/administration/donor-account/stores'

@setCurrentView(rootStore => new DonorAccountCreateViewStore(rootStore), 'donorAccountCreateViewStore')
@observer
class DonorAccountCreate extends React.Component {

    render() {
        return (
            <DonorAccountCreateTemplate {...this.props} />
        )
    }
}


export default DonorAccountCreate;