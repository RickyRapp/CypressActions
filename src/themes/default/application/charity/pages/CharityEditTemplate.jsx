import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const CharityEditTemplate = function ({ charityEditViewStore }) {
    const {
        contentLoading,
        form
    } = charityEditViewStore;

    return (
        <ApplicationEditLayout store={charityEditViewStore}>
            <Content loading={contentLoading} >
                <React.Fragment>
                    <div className="row">
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('name')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('taxId')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('dba')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('charityTypeId')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('charityStatusId')} />
                        </div>
                    </div>
                </React.Fragment>
            </Content>
        </ApplicationEditLayout>
    )
};

CharityEditTemplate.propTypes = {
    charityEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityEditTemplate);
