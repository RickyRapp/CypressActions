import React from "react";
import { remoteDepositEditTemplate } from "themes/application/charity/remote-deposit/pages";
import { observer } from "mobx-react";
import { remoteDepositEditViewStore } from "application/charity/remote-deposit/stores";
import { setCurrentView } from "core/utils";

@setCurrentView(rootStore => new remoteDepositEditViewStore(rootStore), "remotedepositEditViewStore")
@observer
class remoteDepositEdit extends React.Component {
	render() {
		return <remoteDepositEditTemplate {...this.props} />;
	}
}

export default remoteDepositEdit;