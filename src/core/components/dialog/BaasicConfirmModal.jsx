import React from 'react';
import { inject } from 'mobx-react';
import { defaultTemplate } from 'core/utils';
import { BaasicConfirmModalTemplate } from 'themes/components';

function BaasicConfirmModal(props) {
  return <BaasicConfirmModalTemplate {...props} />;
}

export default inject((i, props) => {
  return {
    modalParams: props.modalParams || i.rootStore.modalStore.confirmParams
  };
})(defaultTemplate(BaasicConfirmModal));
