import React from "react";
import { observer } from "mobx-react";
import { setCurrentView } from "core/utils";
import { RemoteDepositListTemplate } from "themes/application/charity/remote-deposit/pages";
import { remoteDepositListViewStore } from "application/charity/remote-deposit/stores";

@setCurrentView(rootStore => new remoteDepositListViewStore(rootStore), "remoteDepositListViewStore")
@observer
class remoteDepositList extends React.Component {
    render() {
        return <RemoteDepositListTemplate {...this.props} />;
    }
}

export default remoteDepositList;