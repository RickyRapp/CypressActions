import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicModal, YesNoView } from 'core/components';

function BaasicConfirmModalTemplate({ modalParams }) {
  return (
    <BaasicModal modalParams={modalParams}>
      <YesNoView
        message={modalParams.data.message}
        onConfirm={modalParams.onConfirm}
        onCancel={modalParams.onCancel}
        loading={modalParams.loading}
      />
    </BaasicModal>
  );
}

export default defaultTemplate(BaasicConfirmModalTemplate);
