import React from 'react';
import Modal from 'react-modal';
import { defaultTemplate } from 'core/utils';
import { Loader } from 'core/components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

function BaasicModalTemplate({ modalParams, children, ...other }) {
  return (
    <Modal isOpen={modalParams.isOpen} style={customStyles} {...other}>
      <button onClick={modalParams.close}>close</button>
      {modalParams.loading ? <Loader /> : children}
    </Modal>
  );
}

export default defaultTemplate(BaasicModalTemplate);
