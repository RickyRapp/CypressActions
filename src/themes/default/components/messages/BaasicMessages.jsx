import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

import {BaasicMessageList} from 'core/components';

const BaasicMessagesTemplate = function ({ baasicMessageStore}) {
    const {messages, markAsRead} = baasicMessageStore;

    const renderList = function() {
        return (
            <div className='spc--bottom--med'>
                <BaasicMessageList messages={messages} markAsRead={markAsRead} />
            </div>
        );
    };

    return (
        <div>
            {renderList()}
        </div>
    )
};

BaasicMessagesTemplate.propTypes = {
    baasicMessageStore: PropTypes.object.isRequired
};

export default defaultTemplate(BaasicMessagesTemplate);
