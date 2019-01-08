import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/utils';

const EmptyStateVerticalTemplate = function (props) {
    const {t, image, title, actionLabel, callToAction, callToActionLabel, description} = props;
    return (
        <div className="emptystate--vertical">
            {image && <div className="emptystate--vertical__image">
                <img src={image} alt="" />
            </div>}

            {title && <h3 className="emptystate--vertical__title">
                {t(title)}
            </h3>}

            {description && <p className="emptystate--vertical__description">{t(description)}</p>}
            {/*<div className="emptystate--vertical__action">*/}
                {/*<label className="emptystate--vertical__action__label">Select desired company</label>*/}
                {/*<input className="input input--select input--med" type="text" />*/}
            {/*</div>*/}
            {callToAction && <div className="emptystate--vertical__action">
                <label className="emptystate--vertical__action__label">{t(actionLabel)}</label>
                <button className="btn btn--med btn--tertiary" onClick={callToAction}>
                    <span className="icomoon icon-add tiny align--v--baseline spc--right--tny" />
                    <span className="align--v--bottom">{t(callToActionLabel)}</span>
                </button>
            </div>}
        </div>
    )
};

EmptyStateVerticalTemplate.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    actionLabel: PropTypes.string,
    callToAction: PropTypes.func,
    callToActionLabel: PropTypes.string,
    t: PropTypes.any
};

export default defaultTemplate(EmptyStateVerticalTemplate);
