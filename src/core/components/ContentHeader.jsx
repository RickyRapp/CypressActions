import React from "react";
import _ from "lodash";
import { inject } from "mobx-react";
import { ContentHeaderTemplate } from "themes/components";

function ContentHeader(props) {
    return <ContentHeaderTemplate {...props} />;
}

export default inject((i, props) => {
    const { rootStore } = i;
    const activeRoute = _.find(rootStore.routerStore.routes, {
        name: rootStore.routerStore.routerState.routeName
    });

    return {
        title: activeRoute.data ? activeRoute.data.title : props.title,
        breadcrumbs: rootStore.breadcrumbs,
        router: rootStore.router
    };
})(ContentHeader);
