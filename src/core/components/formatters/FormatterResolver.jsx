import React from 'react';
import { FormatterResolverTemplate } from 'themes/components';

class FormatterResolver extends React.Component {
    render() {
        return <FormatterResolverTemplate {...this.props} />
    }
}

export default FormatterResolver;