import React from "react";
import { defaultTemplate } from "core/utils";
import { BaasicModal, YesNoView } from "core/components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

function BaasicConfirmModalTemplate({ modalParams }) {
  return (
    <BaasicModal modalParams={modalParams} style={customStyles}>
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
