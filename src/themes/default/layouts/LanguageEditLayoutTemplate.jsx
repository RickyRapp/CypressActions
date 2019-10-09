import React from 'react';
import PropTypes from 'prop-types';
import { BaasicButton, Translation} from 'core/components';
import { ListLayout, PageFooter } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';

function LanguageEditLayoutTemplate({ store, form, loaderStore, t, routeBack }) {    
    const { translationStore, rootStore } = store;
    const back = routeBack || (() => rootStore.routerStore.goBack());
    return (
        <ListLayout loading={loaderStore.loading || translationStore.loaderStore.loading}>
            <PageFooter>
                <div>
                    <BaasicButton
                        type='submit'
                        className='btn btn--med btn--tertiary spc--right--sml display--ib'
                        onClick={e => store.onSuccess(e)}
                        rotate
                        icon={
                            form.submitting || form.validating
                                ? 'synchronize-arrows-1 rotate'
                                : ''
                        }
                        label={t('FORM_CONTROLS.SAVE_BUTTON')}
                    />
                    <BaasicButton className='btn btn--med btn--ghost display-ib' label={t('EDIT_FORM_LAYOUT.CANCEL')} onClick={back} />
                </div>
            </PageFooter>
            <Translation store={translationStore} />
        </ListLayout>
    );
}

LanguageEditLayoutTemplate.propTypes = {
    store: PropTypes.object,
    form: PropTypes.object.isRequired,
    item: PropTypes.object,
    loaderStore: PropTypes.object,
    routeBack: PropTypes.func,
    t: PropTypes.func
};

export default defaultTemplate(LanguageEditLayoutTemplate);
