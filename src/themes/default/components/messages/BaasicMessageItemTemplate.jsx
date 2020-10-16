import React from 'react';
import PropTypes from 'prop-types';

const BaasicMessageItemTemplate = function (props) {
    const markAsRead = function (messageId) {
        props.markAsRead(messageId);
    };

    return (
        <React.Fragment>
            <div>
                <div className="messages__item__sender">
                    <span className="type--color--tertiary type--wgt--med">{props.from}</span> sent a message
				</div>
                <div className="messages__item__message">{props.message}</div>
                <div className="messages__item__time">{props.timestamp.toISOString()}</div>
                <div>
                    {props.isRead ? null : (
                        <React.Fragment>
                            <button className="btn btn--link spc--top--tny" onClick={() => markAsRead(props.id)}>
                                Mark as read
							</button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

BaasicMessageItemTemplate.propTypes = {
    avatar: PropTypes.string,
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    message: PropTypes.string,
    isRead: PropTypes.bool,
    markAsRead: PropTypes.func,
};

export default BaasicMessageItemTemplate;
