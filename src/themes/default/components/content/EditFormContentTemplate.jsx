import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function EditFormContentTemplate({ className, form, children, formClassName }) {
	return (
		<div className={className ? className : ''}>
			{shouldRenderContentChildren(children) ? (
				children
			) : (
				<form className={formClassName ? formClassName : 'u-mar--bottom--med'} onSubmit={form.onSubmit}>
					{children ? <React.Fragment>{children}</React.Fragment> : null}
				</form>
			)}
		</div>
	);
}

EditFormContentTemplate.propTypes = {
	form: PropTypes.object,
	className: PropTypes.string,
	formClassName: PropTypes.string,
	children: PropTypes.any,
};

export default defaultTemplate(EditFormContentTemplate);
