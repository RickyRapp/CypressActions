import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BasicInput, BasicCheckBox } from 'core/components';

function PhoneNumberEditTemplate(props) {

    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountPhoneNumber.$('phoneNumber.number')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountPhoneNumber.$('phoneNumber.description')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicCheckBox
                    field={props.donorAccountPhoneNumber.$('primary')}
                    onChange={(e) => props.onChangePrimaryPhoneNumber(props.donorAccountPhoneNumber.value, e)}
                    disabled={!isSome(props.donorAccountPhoneNumber.$('phoneNumber.id').value) || props.donorAccountPhoneNumber.$('phoneNumber.id').value === '' || props.donorAccountPhoneNumber.$('primary').value}
                />
            </div>

            {!isSome(props.donorAccountPhoneNumber.$('phoneNumber.id').value) || props.donorAccountPhoneNumber.$('phoneNumber.id').value === '' &&
                <button
                    type="button"
                    onClick={props.donorAccountPhoneNumber.onDel}
                >Cancel New Phone Number
                </button>
            }

            {isSome(props.donorAccountPhoneNumber.$('phoneNumber.id').value) &&
                props.donorAccountPhoneNumber.$('phoneNumber.id').value !== '' &&
                props.donorAccountPhoneNumber.$('primary').value !== '' &&
                <button
                    type="button"
                    onClick={() => alert('TODO:delete or mark as deleted?')}
                >Delete Phone Number
                </button>
            }
        </React.Fragment >
    );
}

export default defaultTemplate(PhoneNumberEditTemplate);
