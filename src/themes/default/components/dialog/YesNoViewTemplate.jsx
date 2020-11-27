import React from 'react';

import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

function YesNoViewTemplate({
    message,
    onConfirm,
    onCancel,
    yesLabel = 'MODAL.YES_NO_CONFIRM_LABEL',
    noLabel = 'MODAL.YES_NO_CANCEL_LABEL',
    t,
    loading,
}) {
    return (
        <div>
            <span className="type--base w--500--max w--100 u-padd--right--med u-mar--top--med">{t(message)}</span>
            <div className="u-mar--top--med">
                <BaasicButton
                    className="btn btn--sml btn--sml--wide btn--primary u-mar--right--sml"
                    onClick={onConfirm}
                    disabled={loading}
                    rotate
                    icon={loading ? 'synchronize-arrows-1 rotate' : ''}
                    label={t(yesLabel)}
                />
                <BaasicButton className="btn btn--sml btn--sml--wide btn--ghost" onClick={onCancel} disabled={loading} label={t(noLabel)} />
            </div>
        </div>
    );
}

YesNoViewTemplate.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    yesLabel: PropTypes.string,
    noLabel: PropTypes.string,
    loading: PropTypes.bool,
    t: PropTypes.func,
};

export default defaultTemplate(YesNoViewTemplate);
