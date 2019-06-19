import React from 'react';
import { BasicInput, BasicCheckBox } from 'core/components';
import ReactTooltip from 'react-tooltip'
import { defaultTemplate } from 'core/utils';

function CreateLoginTemplate({ coreUserfields, sendWelcomeEmailField, isApprovedField, emailAddressField, notifyAdministratorsField, t }) {
    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-12">
                <h5>{t('LOGIN')}</h5>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={coreUserfields.$('userName')} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={coreUserfields.$('coreMembership.password')} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicInput field={coreUserfields.$('coreMembership.confirmPassword')} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicCheckBox field={isApprovedField} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicCheckBox field={sendWelcomeEmailField} />
                {sendWelcomeEmailField.value === true &&
                    <span>
                        <span className='icomoon icon-alert-circle' data-tip='sendWelcomeEmail' />
                        <ReactTooltip type='info' place='right' effect='solid' >
                            {emailAddressField.value && emailAddressField.isValid ?
                                <span>Verification Email Will Be Sent On {emailAddressField.value}</span> :
                                <span>Please Add An Email Address</span>}
                        </ReactTooltip>
                    </span>}
            </div>
            {notifyAdministratorsField &&
                <div className="form__group f-col f-col-lrg-3">
                    <BasicCheckBox field={notifyAdministratorsField} />
                </div>}
        </React.Fragment>
    );
};

export default defaultTemplate(CreateLoginTemplate);


