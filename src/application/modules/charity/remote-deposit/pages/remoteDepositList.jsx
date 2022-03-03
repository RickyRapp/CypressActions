import React from "react";
import { observer } from "mobx-react";
import { setCurrentView } from "core/utils";
import { remoteDepositListTemplate } from "themes/application/charity/remote-deposit/pages";
import { remoteDepositListViewStore } from "application/charity/remote-deposit/stores";

@setCurrentView(rootStore => new remoteDepositListViewStore(rootStore), "remotedepositListViewStore")
@observer
class remoteDepositList extends React.Component {
    render() {
        return <remoteDepositListTemplate {...this.props} />;
    }
}

export default remoteDepositList;