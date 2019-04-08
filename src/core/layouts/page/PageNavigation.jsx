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

    return (
      <PageNavigationTemplate {...this.props}>
        <div className="f-row">
          {(!isSome(this.props.showDonorAccountSearch) || this.props.showDonorAccountSearch) && contributionEmployeeRead &&
            <div className={this.props.children ? "f-col f-col-lrg-8" : "f-col f-col-lrg-12"}>
              <div className="spc--top--sml">
                <DonorAccountSearch
                  onChange={event => this.props.rootStore.routerStore.goTo('master.app.main.donor.account.edit', {
                    id: event.id
                  })}

                // onChange={event => this.props.rootStore.routerStore.historyAdapter.history.push('/app/donor-account/edit/' + event.id)}
                />
              </div>
            </div>}

          <div className={(!isSome(this.props.showDonorAccountSearch) || this.props.showDonorAccountSearch) && contributionEmployeeRead ? "f-col f-col-lrg-4" : "f-col f-col-lrg-12"} >
            {this.props.children}
          </div>
        </div>
      </PageNavigationTemplate>
    )
  }
}

export default PageNavigation;
