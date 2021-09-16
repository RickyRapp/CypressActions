import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
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

BaasicConfirmModalTemplate.propTypes = {
    modalParams: PropTypes.object,
};

export default defaultTemplate(BaasicConfirmModalTemplate);
