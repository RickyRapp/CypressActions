import React from 'react';
import { Popup } from '@progress/kendo-react-popup';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { NotifyOutsideClick } from 'core/components';

class DynamicDropdownTemplate extends React.Component {
    anchor = null;

    constructor(props) {
        super(props);
    }

    onAnchorClick = () => {
        this.props.store.toggleVisibility();
    }

    render() {
        const { store, children, AnchorElement } = this.props; // eslint-disable-line

        const Anchor = 
        // eslint-disable-next-line
        (props, ref) => (
            <div ref={(div) => { this.anchor = div; }}>
                <AnchorElement {...props} />
            </div>
        );

        return (
            <div>
                <Anchor 
                    store={store}
                    onClick={this.onAnchorClick}
                    reference={this.anchor}
                />

                <Popup
                    anchor={this.anchor}
                    show={store.visible}
                    popupClass={'popup-content'}
                >
                    <NotifyOutsideClick action={() => store.setVisible(false)}>
                        {children}
                    </NotifyOutsideClick>  
                </Popup>
            </div>          
        )
    }
}

DynamicDropdownTemplate.propTypes = {
    store: PropTypes.object,
    AnchorElement: PropTypes.any,
    children: PropTypes.any
}

DynamicDropdownTemplate.defaultProps = {
    AnchorElement: defaultTemplate(({ store, onClick }) => (
        <span onClick={onClick}>
            {store.value || store.placeholder}
        </span>
    ))
}

export default defaultTemplate(DynamicDropdownTemplate);