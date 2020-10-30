import React from 'react';
import PropTypes from 'prop-types';

const BaasicSideselectTemplate = function (props) {
    const { options, selected, onSelect, labelKey } = props;

    function isActive(item) {
        return selected ? item.id === selected.id : false;
    }

    return (
        <ul className='list--primary'>
            {options.map((item, idx) =>
                <li className={'list--primary__item' + (isActive(item) ? ' active' : '')} key={idx} onClick={() => onSelect(item)}>
                    <span>{item[labelKey]}</span>
                </li>
            )}
        </ul>
    )
};

BaasicSideselectTemplate.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.object,
    onSelect: PropTypes.func,
    children: PropTypes.any,
    labelKey: PropTypes.string
};

BaasicSideselectTemplate.defaultProps = {
    options: [],
    onSelect: () => {},
    labelKey: 'label',
};

export default BaasicSideselectTemplate;
