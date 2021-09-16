import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const EmptyStateHorizontalTemplate = function (props) {
    const { t, image, title, actionLabel, callToAction, callToActionLabel, description, icon, className } = props;

    return (
        <div className={`emptystate--horizontal ${className}`}>
            {image && (
                <div className="emptystate--horizontal__image">
                    <img src={image} alt="" />
                </div>
            )}

            {title && <h5 className="emptystate--horizontal__title">{t(title)}</h5>}

            {description && <p className="emptystate--horizontal__description">{t(description)}</p>}
            {callToAction && (
                <div className="emptystate--horizontal__action">
                    <label className="emptystate--horizontal__action__label">{t(actionLabel)}</label>
                    <button className="btn btn--med btn--tertiary" onClick={callToAction}>
                        <span className={'icomoon ' + icon + ' tiny align--v--baseline spc--right--tny'} />
                        <span className="align--v--bottom">{t(callToActionLabel)}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

EmptyStateHorizontalTemplate.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    actionLabel: PropTypes.string,
    callToAction: PropTypes.func,
    callToActionLabel: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.any,
};

EmptyStateHorizontalTemplate.defaultProps = {
    icon: 'icon-add',
};

export default defaultTemplate(EmptyStateHorizontalTemplate);
