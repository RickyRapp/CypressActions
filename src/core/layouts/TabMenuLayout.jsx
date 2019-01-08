import React from "react";
import { inject } from "mobx-react";
import { TabMenuLayoutTemplate } from "themes/layouts";

function TabMenuLayout(props) {
    return <TabMenuLayoutTemplate {...props} />;
}

export default inject(i => {
    return {
        menuStore: i.rootStore.menuStore
    };
})(TabMenuLayout);
