import React from 'react';
import PropTypes from 'prop-types';
import { BaasicButton } from 'core/components';

const BaasicTableNoRecordsTemplate = function (props) {
    return (
        <div>
            <div className='type--center spc--bottom--sml spc--top--tny'>
                {props.label}
            </div>
            {props.createFn ? (
                <BaasicButton
                    authorization={props.auth ? props.auth.create : null}
                    className='btn btn--med btn--tertiary display--b align--h--center' 
                    onClick={props.createFn}
                    label={'LIST_LAYOUT.CREATE_BUTTON'}
                    >
                    <span className='icomoon tiny icon-add align--v--middle spc--right--tny' />
                </BaasicButton>
            ) : null}
        </div>
    )
};

BaasicTableNoRecordsTemplate.propTypes = {
    label: PropTypes.string,
    createFn: PropTypes.func,
    auth: PropTypes.any
};

BaasicTableNoRecordsTemplate.defaultProps = {
    label: 'No records'
};

export default BaasicTableNoRecordsTemplate;
