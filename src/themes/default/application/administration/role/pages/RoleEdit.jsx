import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BasicInput, BasicTextArea } from 'core/components';
import { ApplicationEditLayout, Content } from 'core/layouts';

function RoleEditTemplate({ editView }) {
    const {
        contentLoading,
        form,
    } = editView;

    return (
        <ApplicationEditLayout store={editView}>
            <Content loading={contentLoading} >
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-lrg-12 spc--bottom--sml">
                        <BasicTextArea field={form.$('description')} />
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout>
    )
}

RoleEditTemplate.propTypes = {
    editView: PropTypes.object
};

export default defaultTemplate(RoleEditTemplate);
