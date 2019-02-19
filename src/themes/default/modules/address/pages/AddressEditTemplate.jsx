import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BasicInput, BasicCheckBox } from 'core/components';

function AddressEditTemplate(props) {

    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountAddress.$('address.addressLine1')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountAddress.$('address.addressLine2')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountAddress.$('address.city')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountAddress.$('address.state')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountAddress.$('address.zipCode')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountAddress.$('address.description')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicCheckBox
                    field={props.donorAccountAddress.$('primary')}
                    onChange={(e) => props.onChangePrimaryAddress(props.donorAccountAddress.value, e)}
                    disabled={!isSome(props.donorAccountAddress.$('address.id').value) || props.donorAccountAddress.$('address.id').value === '' || props.donorAccountAddress.$('primary').value}
                />
            </div>

            {!isSome(props.donorAccountAddress.$('address.id').value) || props.donorAccountAddress.$('address.id').value === '' &&
                <button
                    type="button"
                    onClick={props.donorAccountAddress.onDel}
                >Cancel New Address
                </button>
            }

            {isSome(props.donorAccountAddress.$('address.id').value) &&
                props.donorAccountAddress.$('address.id').value !== '' &&
                props.donorAccountAddress.$('primary').value !== '' &&
                <button
                    type="button"
                    onClick={() => alert('TODO:delete or mark as deleted?')}
                >Delete Address
                </button>
            }
        </React.Fragment >
    );
}

export default defaultTemplate(AddressEditTemplate);
