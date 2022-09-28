import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const className = suffix => (suffix ? `${suffix}` : '');
const BasicCheckboxTemplate = function({
	id,
	label,
	checked,
	onChange,
	t,
	showLabel = false,
	disabled,
	classSuffix = null,
}) {
	return (
		<React.Fragment>
			<span className="u-display--if">
				{showLabel && classSuffix === '--toggle' ? <span className="u-mar--right--sml">{t(label)}</span> : null}
				<input
					id={id}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					type="checkbox"
					className={`input--check${className(classSuffix)}`}
				/>
				{showLabel ? <label htmlFor={id}>{t(label)}</label> : <label htmlFor={id}>&nbsp;</label>}
			</span>
		</React.Fragment>
	);
};

BasicCheckboxTemplate.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	showLabel: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	classSuffix: PropTypes.string,
	t: PropTypes.func,
};

BasicCheckboxTemplate.defaultProps = {
	disabled: false,
};

export default defaultTemplate(BasicCheckboxTemplate);
