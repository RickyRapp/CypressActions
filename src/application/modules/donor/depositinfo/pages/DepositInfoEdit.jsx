import React from "react";
import { DepositInfoEditTemplate } from "themes/application/depositinfo/pages";
import { observer } from "mobx-react";
import { DepositInfoEditViewStore } from "application/administration/depositinfo/stores";
import { setCurrentView } from "core/utils";

@setCurrentView(rootStore => new DepositInfoEditViewStore(rootStore), "depositinfoEditViewStore")
@observer
class DepositInfoEdit extends React.Component {
	render() {
		return <DepositInfoEditTemplate {...this.props} />;
	}
}

export default DepositInfoEdit;