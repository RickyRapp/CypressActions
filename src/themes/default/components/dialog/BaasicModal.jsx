import React from 'react';
import Modal from 'react-modal';
import { defaultTemplate } from "core/utils";
import { Loader } from 'core/components';

function BaasicModalTemplate({ modalParams, children, ...other }) {
    return (
        <Modal isOpen={modalParams.isOpen} {...other}>
            <button onClick={modalParams.close}>close</button>
            {modalParams.loading ? <Loader /> : children}
        </Modal>
    )
}

export default defaultTemplate(BaasicModalTemplate);