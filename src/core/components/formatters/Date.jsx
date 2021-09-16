import React from 'react';
import { inject } from 'mobx-react';
import { DateTemplate } from 'themes/components';

@inject(i => ({
    language: i.rootStore.localizationStore.language,
    timeZone: i.rootStore.timeZoneStore.timeZone
}))
class Date extends React.Component {
    render() {
        return <DateTemplate {...this.props} />
    }
}

export default Date;