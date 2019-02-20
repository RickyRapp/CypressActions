import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BasicInput, BasicCheckBox } from 'core/components';

function EmailAddressEditTemplate(props) {

    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountEmailAddress.$('emailAddress.email')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountEmailAddress.$('emailAddress.description')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicCheckBox
                    field={props.donorAccountEmailAddress.$('primary')}
                    onChange={(e) => props.onChangePrimaryEmailAddress(props.donorAccountEmailAddress.value, e)}
                    disabled={!isSome(props.donorAccountEmailAddress.$('emailAddress.id').value) || props.donorAccountEmailAddress.$('emailAddress.id').value === '' || props.donorAccountEmailAddress.$('primary').value}
                />
            </div>

            {!isSome(props.donorAccountEmailAddress.$('emailAddress.id').value) || props.donorAccountEmailAddress.$('emailAddress.id').value === '' &&
                <button
                    type="button"
                    onClick={props.donorAccountEmailAddress.onDel}
                >Cancel New Email Address
                </button>
            }

            {isSome(props.donorAccountEmailAddress.$('emailAddress.id').value) &&
                props.donorAccountEmailAddress.$('emailAddress.id').value !== '' &&
                !props.donorAccountEmailAddress.$('primary').value &&
                <button
                    type="button"
                    onClick={() => alert('TODO:delete or mark as deleted?')}
                >Delete Email Address
                </button>
            }
        </React.Fragment >
    );
}

export default defaultTemplate(EmailAddressEditTemplate);
