import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown } from 'core/components';
import { isSome, renderIf } from 'core/utils';

const BaasicFieldDropdownTemplate = function ({
	store,
	field,
	multi,
	className,
	itemRender,
	valueRender,
	disabled = false,
	showLabel = true,
	t,
	rightLabelComponent,
}) {
	function onChange(event) {
		const value = event.target.value;
		if (store && store.options) {
			store.options.disabled = disabled;
		}

		if (value) {
			if (store.options.multi) {
				field.set(value);
				if (value.length === 0) {
					field.showErrors(true);
				}
			} else {
				field.set(value[store.options.dataItemKey]);
			}
		}
		else {
			field.clear();
		}

		store.onChange(value);
	}

	const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span className="type--color--note u-mar--left--tny">*</span> : null;
	const warningClasses = classNames({
		'input--warning': !field.isValid && field.touched && !field.isDirty,
	});

	store.options.disabled = field.disabled;

	return (
		<React.Fragment>
			{showLabel && (
				<div className="form__group__label">

					{t(field.label)}
					{requiredMark}

					{rightLabelComponent && rightLabelComponent()}

				</div>
			)}
			<BaasicDropdown
				{...field.bind()}
				store={store}
				placeholder={field.placeholder}
				value={field.value}
				onChange={onChange}
				multi={multi}
				className={className}
				warningClassName={warningClasses}
				itemRender={itemRender}
				valueRender={valueRender}
			/>
			{(!field.isValid || field.hasError) &&
				renderIf(isSome(field.localizedError))(
					<p className="validation__message">{field.localizedError}</p>
				)}
		</React.Fragment>
	);
};

BaasicFieldDropdownTemplate.propTypes = {
	store: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	multi: PropTypes.bool,
	className: PropTypes.string,
	itemRender: PropTypes.any,
	valueRender: PropTypes.any,
	disabled: PropTypes.bool,
	showLabel: PropTypes.bool,
	t: PropTypes.any,
	rightLabelComponent: PropTypes.any,
};

export default defaultTemplate(BaasicFieldDropdownTemplate);
