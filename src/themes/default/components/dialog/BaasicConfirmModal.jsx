import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicModal, YesNoView } from 'core/components';

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

BaasicConfirmModalTemplate.propTypes = {
    modalParams: PropTypes.object
}

export default defaultTemplate(BaasicConfirmModalTemplate);
