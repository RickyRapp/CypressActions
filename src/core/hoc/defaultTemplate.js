import { observer } from 'mobx-react';
import { withNamespaces } from 'react-i18next';

export default function defaultTemplate(TemplateComponent) {
    return withNamespaces()(observer(TemplateComponent));
}
