import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const EmptyStateVerticalTemplate = function (props) {
    const { t, image, title, actionLabel, callToAction, callToActionLabel, description, icon, className } = props;
    return (
        <div className={`card--primary card--lrg emptystate--vertical ${className}`}>
            {image && (
                <div className="emptystate--vertical__image">
                    <img src={image} alt="" />
                </div>
            )}

            {title && <h4 className="emptystate--vertical__title">{t(title)}</h4>}

            {description && <p className="emptystate--vertical__description">{t(description)}</p>}
            {callToAction && (
                <div className="emptystate--vertical__action">
                    <label className="emptystate--vertical__action__label">{t(actionLabel)}</label>
                    <button className="btn btn--med btn--tertiary" onClick={callToAction}>
                        <span className={'icomoon ' + icon + ' tiny align--v--baseline spc--right--tny'} />
                        <span className="align--v--bottom">{t(callToActionLabel)}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

EmptyStateVerticalTemplate.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    actionLabel: PropTypes.string,
    className: PropTypes.string,
    callToAction: PropTypes.func,
    callToActionLabel: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.any,
};

EmptyStateVerticalTemplate.defaultProps = {
    icon: 'icon-add',
};

export default defaultTemplate(EmptyStateVerticalTemplate);
