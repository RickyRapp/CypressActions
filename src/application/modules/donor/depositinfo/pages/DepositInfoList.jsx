import React from "react";
import { observer } from "mobx-react";
import { setCurrentView } from "core/utils";
import { DepositInfoListTemplate } from "themes/application/depositinfo/pages";
import { DepositInfoListViewStore } from "application/administration/depositinfo/stores";

@setCurrentView(rootStore => new DepositInfoListViewStore(rootStore), "depositinfoListViewStore")
@observer
class DepositInfoList extends React.Component {
    render() {
        return <DepositInfoListTemplate {...this.props} />;
    }
}

export default DepositInfoList;