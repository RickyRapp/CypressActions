import React from 'react';
import { BaasicTabHeader, BaasicTab } from 'core/components';
import { observer } from 'mobx-react';

@observer
class BaasicTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabIndex, callback) {
    this.props.onChangeTab(tabIndex);
    callback(tabIndex);
  }

  renderTabs() {
    return React.Children.map(this.props.children, (tab, idx) => {
      if (!this.isTab(tab)) return null;

      const { label, render, onTabClick } = tab.props;
      const tabClickCallback = onTabClick || (idx => {});
      return (
        <BaasicTabHeader
          label={label}
          render={render}
          onClick={() => this.handleTabClick(idx, tabClickCallback)}
          tabIndex={idx}
          isActive={idx === this.props.activeIndex}
        />
      );
    });
  }

  renderTabsContent() {
    const { children, activeIndex } = this.props;

    const tabs = React.Children.toArray(children);
    const tab = tabs[activeIndex];
    if (tab && this.isTab(tab)) {
      return tab.props.children(tab.props);
    }

    return null;
  }

  isTab(child) {
    return child && child.type === BaasicTab;
  }

  render() {
    return (
      <div>
        <div>{this.renderTabs()}</div>
        <div>{this.renderTabsContent()}</div>
      </div>
    );
  }
}

BaasicTabs.defaultProps = {
  activeIndex: 0
};

export default BaasicTabs;
