import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicTextArea,
} from 'core/components'

const CharityDescriptionTemplate = function ({t, charityDescriptionViewStore}){

    const {
        loaderStore,
        form
    } = charityDescriptionViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.DESCRIPTION.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__dd">
                        <BasicTextArea field={form.$('charityDescription')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
                
            </EditFormContent>   
        </div>
    );


}

CharityDescriptionTemplate.propTypes = {
    charityDescriptionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityDescriptionTemplate);