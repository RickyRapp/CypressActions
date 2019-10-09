import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { BaasicDropdownStore } from 'core/stores';
import moment from 'moment';
import 'moment-timezone';

class TimeZoneStore {
    intervalHandle = null;
    @observable time = null;
    @observable dropdownOpen = false;

    // eslint-disable-next-line
    constructor(rootStore) {
        const timeZones = _.map(moment.tz.names(), tz => ({
            id: tz,
            name: `${tz} - (GMT${moment.tz(tz).format('Z')})`
        }));

        this.dropdownStore = new BaasicDropdownStore(
            {
                filterable: true,
                initFetch: false,
                defaultItem: null,
                popupSettings: {
                    animate: false,
                    className: 'w--auto'
                }
            },
            {},
            timeZones
        );

        this.dropdownStore.setValue(moment.tz.guess());

        this.intervalHandle = setInterval(() => this.clockTick(), 1000);
    }

    @action clockTick() {
        this.time = moment.tz(moment.utc(), this.timeZone);
    }

    @computed get timeZone() {
        const value = this.dropdownStore.value;
        return value ? (_.isString(value) ? value : value.id) : null;
    }
}

export default TimeZoneStore;
