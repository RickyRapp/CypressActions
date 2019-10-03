import React from "react";
import Modal from "react-modal";
import { defaultTemplate } from "core/utils";

function BaasicModalTemplate({ modalParams, children, ...other }) {
  return (
    <Modal
      className="modal__content"
      overlayClassName="modal__overlay"
      isOpen={modalParams.isOpen}
      {...other}
    >
      <span
        className="icomoon icon-remove modal__icon--close"
        onClick={modalParams.close}
      />
      {React.cloneElement(children, { modalParams })}
    </Modal>
  );
}

export default defaultTemplate(BaasicModalTemplate);
