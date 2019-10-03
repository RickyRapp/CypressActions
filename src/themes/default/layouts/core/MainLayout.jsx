import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, Loader, Menu } from 'core/components';
import { defaultTemplate } from 'core/utils';
import { BaasicConfirmModal } from 'core/components';

function MainLayoutTemplate({ render, initialized, viewStore, ...props }) {
  if (!initialized) return <Loader />;

  const {
    rootStore: { menuStore }
  } = viewStore;

  return (
    <div>
      <div className="layout">
        <Header />
        <Menu />
        <div
          className={
            'layout__content' +
            (menuStore.secondaryMenuVisible ? ' active' : '')
          }
        >
          {render(props)}
        </div>
        <BaasicConfirmModal />
      </div>
    </div>
  );
}

MainLayoutTemplate.propTypes = {
  render: PropTypes.func
};

export default defaultTemplate(MainLayoutTemplate);
