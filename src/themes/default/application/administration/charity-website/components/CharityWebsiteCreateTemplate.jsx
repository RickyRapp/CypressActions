import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    NumberFormatInputField,
    BasicRadio
} from 'core/components'
import { PageFooter } from 'core/layouts';
import AsyncSelect from 'react-select/async';

const CharityWebsiteCreateTemplate = function ({ t, charityWebsiteCreateViewStore }) {
    const {
        loaderStore,
        form,
        id,
        validateIPaddress,
        debouncedSearchCharities,
        setCharityId,
    } = charityWebsiteCreateViewStore;
  
    let promiseOptions = (inputValue) =>
    new Promise(resolve => {
            inputValue.length >= 3 ? debouncedSearchCharities(inputValue, resolve) : resolve(null);
    });

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className=" u-mar--bottom--med">{t(id ? 'CHARITY_WEBSITE.EDIT.TITLE' : 'CHARITY_WEBSITE.CREATE.TITLE')}</h3>
                <div className="row row--form">
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <NumberFormatInputField field={form.$('ip')} onBlur={validateIPaddress} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('url')} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicRadio
                                label={ 'Third pary API' }  
                                value={ 'ThirdParyAPI' }
                                field={ form.$('websiteType') }
                            />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicRadio
                                label={ 'Processing company' }
                                value={ 'ProcessingCompany' }
                                field={ form.$('websiteType') }
                            />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicRadio
                                label={ 'Fundraising platforms' }
                                value={ 'FundraisingPlatforms' }
                                field={ form.$('websiteType') }
                            />
                        </div>
                    </div>
                    {form.$('websiteType').value !== 'FundraisingPlatforms' &&
                        <div className="u-mar--bottom--sml col col-lrg-12">
                            <AsyncSelect onChange={e => setCharityId(e.value)} cacheOptions defaultOptions={true} loadOptions={promiseOptions} classNamePrefix="react-select" />
                        </div>
                    }
                    
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section>
    )
}

CharityWebsiteCreateTemplate.propTypes = {
    charityWebsiteCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityWebsiteCreateTemplate);
