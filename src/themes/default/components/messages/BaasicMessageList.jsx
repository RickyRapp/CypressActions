import React from 'react';
import PropTypes from 'prop-types';

import { BaasicMessageItem } from 'core/components';

const BaasicMessageListTemplate = function (props) {
    return (
        <div>
            <div className='spc--bottom--sml'>
                <h4 className='spc--right--sml display--ib'>Messages</h4>
                <a className='type--sml type--color--grey push' href='#'>Mark All as Read</a>
            </div>
            <div className='messages'>
                {props.messages.length === 0 ? (
                    <React.Fragment>
                        No messages
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {props.messages.map((message, idx) =>
                            <div key={idx} className={'messages__item ' + (message.isRead ? '' : 'unread')}><BaasicMessageItem key={idx} {...message} markAsRead={props.markAsRead} /></div>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
};

BaasicMessageListTemplate.propTypes = {
    messages: PropTypes.array,
    markAsRead: PropTypes.func
};

export default BaasicMessageListTemplate;
