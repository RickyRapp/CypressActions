import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function BaasicModalTemplate({ modalParams, children, showClose = true, ...other }) {
    return (
        <Modal
            className='modal__content'
            overlayClassName='modal__overlay'
            isOpen={modalParams.isOpen}
            {...other}
        >
            {showClose &&
                <span
                    className='u-icon u-icon--sml u-icon--close modal__icon--close'
                    onClick={modalParams.close}
                />}
            {React.cloneElement(children, { modalParams })}
        </Modal>
    );
}

BaasicModalTemplate.propTypes = {
    modalParams: PropTypes.object,
    children: PropTypes.any,
    hideNavigation: PropTypes.bool,
    showClose: PropTypes.bool
};

export default defaultTemplate(BaasicModalTemplate);
