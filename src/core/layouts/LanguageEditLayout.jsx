import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {LanguageEditLayoutTemplate} from 'themes/layouts';
import { BaseViewStore, TranslationStore } from 'core/stores';
import _ from 'lodash';

@inject(i => ({
    rootStore: i.rootStore
}))
class LanguageEditLayout extends Component {
    constructor(props) {
        super(props);

        // can't inject because of circular rerender
    }
    render() {       
        return (
            <LanguageEditLayoutTemplate 
                store={new LanguageEditLayoutViewStore(this.props.rootStore, this.props)}
                {...this.props} />
        )
    }
}

LanguageEditLayout.propTypes = {
    store: PropTypes.object, //LanguageEditLayoutViewStore
    form: PropTypes.object.isRequired,
    item: PropTypes.object,
    loaderStore: PropTypes.object,
    routeBack: PropTypes.func,
    rootStore: PropTypes.object
};

class LanguageEditLayoutViewStore extends BaseViewStore {
    constructor(rootStore, props) {
        super(rootStore);

        const { form, item } = props;
        
        this.translationStore = new TranslationStore(
            rootStore, 
            { ..._.cloneDeep(form.getLocalizeFields()) },
            item
        );
        
        this.onSuccess = () => {        
            const values = this.translationStore.applyMetadata(item);
            form.$hooks.onSuccess({
                ...item,
                languageMetadata: values
            })
        }
    }
}

export default LanguageEditLayout;
