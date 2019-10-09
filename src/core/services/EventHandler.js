class EventHandler {
    events = {};

    triggerEvent(eventName, data) {
        const event = this.events[eventName];
        if(!event){
            return;
        }
        event.trigger(data);
    }

    addEvent(eventName, func) {
        let event = this.events[eventName];
        if (!event) {
            event = new Event(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(func);
        
        // return disposer func
        return () => {
            event.unregisterCallback(func);
        }
    }
}

class Event {
    callbacks = [];
    name = null;

    constructor(name) {
        this.name = name;
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }

    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    trigger(data) {
        const callbacks = [...this.callbacks];
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    }
}

export default EventHandler;