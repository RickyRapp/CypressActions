import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicInput } from 'core/components';
import _ from 'lodash';

function BaasicSwitchTemplate({ label, value, onChange, t, disabled }) {
	const onId = _.uniqueId('on_');
	const offId = _.uniqueId('off_');
	return (
		<div className="item u-mar--bottom--sml">
			<div className="row row__align--center">
				<div className="col col-sml-3">{label && <label>{t(label)}</label>}</div>
                <div className="col col-sml-1">
                    <span className="type--base type--color--note">2.9%</span>
                </div>
				<div className="col col-sml-3">
					<div className="input--switch u-clearfix">
						<BaasicInput
							type="radio"
							id={onId}
							name={onId}
							checked={value === false}
							onChange={e => {
								e.target.checked = false;
								onChange(e);
							}}
							disabled={disabled}
							label={`${label}_TRUE`}
							wrapperClassName="input--switch__wrapper"
						/>
						<BaasicInput
							type="radio"
							id={offId}
							name={offId}
							checked={value === true}
							onChange={e => {
								e.target.checked = true;
								onChange(e);
							}}
							disabled={disabled}
							label={`${label}_FALSE`}
							wrapperClassName="input--switch__wrapper"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

BaasicSwitchTemplate.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	t: PropTypes.func,
};

export default defaultTemplate(BaasicSwitchTemplate);
