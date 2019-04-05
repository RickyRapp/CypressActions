import React from 'react';
import { PageNavigationTemplate } from 'themes/layouts';
import { DonorAccountSearch } from 'modules/donor-account/components';
import { inject } from "mobx-react";
import { isSome } from "core/utils";

@inject(i => ({
  rootStore: i.rootStore
}))
class PageNavigation extends React.Component {

  render() {
    const contributionEmployeeRead = this.props.rootStore.authStore.hasPermission('theDonorsFundSection.read');
    debugger;
    return (
      <PageNavigationTemplate {...this.props}>
        {(!isSome(this.props.showDonorAccountSearch) || this.props.showDonorAccountSearch) && contributionEmployeeRead &&
          <div className="spc--top--sml">
            <DonorAccountSearch
              onChange={event => this.props.rootStore.routerStore.goTo('master.app.main.donor.account.edit', {
                id: event.id
              })}

            // onChange={event => this.props.rootStore.routerStore.historyAdapter.history.push('/app/donor-account/edit/' + event.id)}
            />
          </div>}
      </PageNavigationTemplate>
    )
  }
}

export default PageNavigation;
