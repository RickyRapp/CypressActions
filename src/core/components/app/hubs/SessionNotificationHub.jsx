import React from 'react';
import { action } from 'mobx';
import _ from 'lodash';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('signalr');

class SessionNotificationHub extends React.Component {
    constructor(props) {
        super(props);

        this.rootStore = props.rootStore;
        this.addNewCertificate = props.addNewCertificate;
        this.loadS();
    }

    @action.bound async loadS() {
        const response = await this.rootStore.app.baasic.apiClient.get("http://api.thedonorsfund.local/signalr/hubs");
        eval(response.data);
        $.connection.hub.url = "http://api.thedonorsfund.local/signalr";

        const sessionHub = $.connection.sessionHub;
        // Create a function that the hub can call back to display messages.
        sessionHub.client.newCertificate = this.addNewCertificate;

        // Start the connection.
        $.connection.hub.start()
            .then(_.bind(function () {
                sessionHub.invoke('getConnectionId')
                    .then(_.bind(function (connectionId) {
                        this.props.setConnectionId(connectionId);
                    }, this));
            }, this));
    }

    render() {
        return (<div>test</div>)
    }
}

export default SessionNotificationHub;