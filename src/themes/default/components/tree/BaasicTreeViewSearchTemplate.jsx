import React from 'react';
import PropTypes from 'prop-types';

const BaasicTreeViewSearchTemplate = function (props) {
    return (
        <div>
            <input type='text' className={props.className} value={props.value}
                   onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder}/>
            <div onClick={ () => props.onChange('') }> 
                <i className='icomoon icon-remove treeview__search__clear'/>
            </div>
        </div>
    )
};

BaasicTreeViewSearchTemplate.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

BaasicTreeViewSearchTemplate.defaultProps = {
    placeholder: 'Search'

};

export default BaasicTreeViewSearchTemplate;
