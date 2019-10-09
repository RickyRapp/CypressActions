import {observable, action} from 'mobx';
import {BaseViewStore} from 'core/stores';

import {cloneDeep} from 'lodash';

class BaasicMessageStore extends BaseViewStore {
    @observable.ref messages = [];

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;

        this.setMessages([
            {
                id: '1',
                from: 'System',
                timestamp: new Date(),
                message: 'Player XY created a ticket',
                isRead: false
            },
            {
                id: '2',
                from: 'System',
                timestamp: new Date(),
                message: 'Suspicious action',
                isRead: false
            },
            {
                id: '3',
                from: 'System',
                timestamp: new Date(),
                message: 'Something urgent',
                isRead: false
            },
            {
                id: '4',
                from: 'System',
                timestamp: new Date(),
                message: 'Player XY created a ticket',
                isRead: false
            },
            {
                id: '5',
                from: 'System',
                timestamp: new Date(),
                message: 'Player XY created a ticket',
                isRead: true
            },
            {
                id: '6',
                from: 'System',
                timestamp: new Date(),
                message: 'Player XY created a ticket',
                isRead: true
            },
            {
                id: '7',
                from: 'System',
                timestamp: new Date(),
                message: 'Player XY created a ticket',
                isRead: true
            }
        ]);
    }

    @action.bound setMessages(messages) {
        this.messages = messages;
    }

    @action.bound markAsRead(messageId) {
        let msgs = cloneDeep(this.messages);

        let msgIdx = msgs.findIndex(m => m.id == messageId);

        if(msgIdx != null) {
            msgs[msgIdx].isRead = true;
        }

        this.setMessages(msgs);
    }
}

export default BaasicMessageStore;
