import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ListBoxPanel } from 'core/components';

function ListBoxTemplate({ store, t }) {
    const { leftPanelStore, rightPanelStore, moveRight, moveLeft, options } = store;
    return (
        <div className='listbox'>
            <div>
                <p className='spc--bottom--tny'>{t(options.leftHeader)}</p>
                <ListBoxPanel className='listbox__content' store={leftPanelStore} />
            </div>
            <div className='listbox__buttons'>
                <i className='icomoon icon-navigation-right-circle-1' onClick={() => moveRight()} />
                <i className='icomoon icon-navigation-left-circle-1' onClick={() => moveLeft()} />
            </div>
            <div>
                <p className='spc--bottom--tny'>{t(options.rightHeader)}</p>
                <ListBoxPanel className='listbox__content' store={rightPanelStore}  />
            </div>
        </div>
    )
}

ListBoxTemplate.propTypes = {
    store: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(ListBoxTemplate);
