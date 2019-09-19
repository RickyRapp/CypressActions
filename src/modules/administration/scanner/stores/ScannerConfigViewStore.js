import { BaseViewStore } from 'core/stores';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('signalr');

class ScannerConfigViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);

        this.rootStore = rootStore;
        this.loadS();
    }

    async loadS() {
        const response = await this.rootStore.app.baasic.apiClient.get("http://api.thedonorsfund.local/signalr/hubs");
        eval(response.data);
        $.connection.hub.url = "http://api.thedonorsfund.local/signalr";
        var chat = $.connection.chatHub;
        // Create a function that the hub can call back to display messages.
        chat.client.newConnection = function (name) {
            alert(name);
        };

        // Start the connection.
        $.connection.hub.start();
    }
}

export default ScannerConfigViewStore;
