import React from 'react';
import { PageNavigationTemplate } from 'themes/layouts';
import { inject } from "mobx-react";

@inject(i => ({
  rootStore: i.rootStore
}))
class PageNavigation extends React.Component {

  render() {
    return (
      <PageNavigationTemplate {...this.props}>
        <div className="f-row">
          <div className="f-col f-col-lrg-12" >
            {this.props.children}
          </div>
        </div>
      </PageNavigationTemplate>
    )
  }
}

export default PageNavigation;
