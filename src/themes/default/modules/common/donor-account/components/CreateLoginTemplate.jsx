import React from 'react';
import { BasicInput, BasicCheckBox } from 'core/components';
import ReactTooltip from 'react-tooltip'
import { defaultTemplate } from 'core/utils';

const CreateLoginTemplate = defaultTemplate(({ coreUserfields, sendWelcomeEmailField, isApprovedField, emailAddressField }) => {
    return (
        //TODO: why below not working when changing sendWelcomeEmailField, it's not observable
        //function CreateLoginTemplate({ coreUserfields, sendWelcomeEmailField, isApprovedField, emailAddressField }) {
        //return ( 
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-12">
                <h5>Login</h5>
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
                <BasicCheckBox field={sendWelcomeEmailField} />
                {sendWelcomeEmailField.value === true &&
                    <span>
                        <span className='icomoon medium icon-cog' data-tip='sendWelcomeEmail' />
                        <ReactTooltip type='info' effect='solid'>
                            {emailAddressField.value && emailAddressField.isValid ?
                                <span>Verification Email Will Be Sent On {emailAddressField.value}</span> :
                                <span>Please Add An Email Address</span>}
                        </ReactTooltip>
                    </span>}
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <BasicCheckBox field={isApprovedField} />
            </div>
        </React.Fragment>
    );
});

export default CreateLoginTemplate;


