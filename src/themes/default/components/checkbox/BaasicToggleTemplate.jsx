import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

function BaasicToggleTemplate({ label, value, onChange, disabled, t, showLabel, wrapperClassName }) {
	return (
		<div className={`${wrapperClassName ? wrapperClassName : "toggle__wrapper"}`}>
			<input className={`input toggle ${value ? 'toggle--active' : ''}`} type="checkbox" onClick={onChange} />
			<div className="u-mar--left--sml">
				<span>{showLabel ? t(label) : null}</span>
			</div>
		</div>
	);
}

BaasicToggleTemplate.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
	disabled: PropTypes.bool,
	showLabel: PropTypes.bool,
	label: PropTypes.string,
	wrapperClassName: PropTypes.string,
	t: PropTypes.func,
};

export default defaultTemplate(BaasicToggleTemplate);

{/* <BaasicButton
	className={`toggle__btn ${value ? '' : 'toggle__btn--active'}`}
	onClick={onChange}
	disabled={disabled}
	label={null}
/>

<BaasicButton
	className={`toggle__btn ${value ? 'toggle__btn--active' : ''}`}
	disabled={disabled}
	label={null}
/> */}