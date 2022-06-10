import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicInput } from 'core/components';
import _ from 'lodash';

function BaasicSwitchTemplate({ label, firstLabel, secondLabel, value, onChange, t, disabled, regular, secondarySwitch }) {
	console.log(onChange);

	const onId = _.uniqueId('on_');
	const offId = _.uniqueId('off_');
	return (
		secondarySwitch ?
			<div className="input--switch input--switch--lrg input--switch--secondary u-clearfix">
				<BaasicInput
					type="radio"
					id={onId}
					name={onId}
					checked={value}
					onChange={e => {
						e.target.checked = false;
						onChange(e);
					}}
					disabled={disabled}
					label={`${firstLabel}`}
					wrapperClassName="input--switch__wrapper"
				/>
				<BaasicInput
					type="radio"
					id={offId}
					name={offId}
					checked={!value}
					onChange={e => {
						e.target.checked = true;
						onChange(e);
					}}
					disabled={disabled}
					label={`${secondLabel}`}
					wrapperClassName="input--switch__wrapper"
				/>
			</div>
			:
			<div className="item u-mar--bottom--sml">
				<div className="row row__align--center">
					<div className="col col-sml-7 col-lrg-6 col-xlrg-5 col-xxlrg-5">{label && <label>{t(label)}</label>}</div>
					{!regular &&
						<div className="col col-sml-1 col-xlrg-2 u-display--none--med">
							<span className="type--base type--color--note">2.9%</span>
						</div>
					}
					<div className="col col-sml-5 col-lrg-5">
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
	firstLabel: PropTypes.string,
	secondLabel: PropTypes.string,
	regular: PropTypes.bool,
	secondarySwitch: PropTypes.bool,
	t: PropTypes.func,
};

export default defaultTemplate(BaasicSwitchTemplate);
