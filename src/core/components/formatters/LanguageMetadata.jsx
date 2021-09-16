import React from 'react';
import { inject } from 'mobx-react';
import { LanguageMetadataTemplate } from 'themes/components';

@inject(i => ({
    language: i.rootStore.localizationStore.language
}))
class LanguageMetadata extends React.Component {
    render() {
        return <LanguageMetadataTemplate {...this.props} />
    }
}

export default LanguageMetadata;