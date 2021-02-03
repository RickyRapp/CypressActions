import React from 'react';
import PropTypes from 'prop-types';
import { BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const BookletOrderCreateTemplate = function ({ onRemoveBookletClick, onAddBookletClick, label, bookletType, denominationType }) {

    return (
        <React.Fragment>
            <BaasicButton
                className="counter__btn counter__btn--minus"
                icon={'counter__icon counter__icon--minus'}
                label='REMOVE'
                onlyIcon={true}
                onClick={() => onRemoveBookletClick(bookletType.id, denominationType && denominationType.id)}>
            </BaasicButton>
            <BaasicButton
                className="counter__btn counter__btn--count type--wgt--medium"
                label={label}
                onClick={() => { }}>
            </BaasicButton>
            <BaasicButton
                className="counter__btn counter__btn--plus"
                icon={'counter__icon counter__icon--plus'}
                label='ADD'
                onlyIcon={true}
                onClick={() => onAddBookletClick(bookletType.id, denominationType && denominationType.id)}>
            </BaasicButton>
        </React.Fragment>
    )
}

BookletOrderCreateTemplate.propTypes = {
    onRemoveBookletClick: PropTypes.func.isRequired,
    onAddBookletClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    bookletType: PropTypes.object.isRequired,
    denominationType: PropTypes.object,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderCreateTemplate);
