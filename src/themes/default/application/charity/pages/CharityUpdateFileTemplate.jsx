import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicDropzone,
    BaasicButton
} from 'core/components';
import { Page } from 'core/layouts';

const CharityUpdateFileTemplate = function ({ charityUpdateFileViewStore, t }) {
    const {
        uploadTypes,
        insertImage,
        onAttachmentDrop,
        uploadLoading
    } = charityUpdateFileViewStore;

    return (
        <Page >
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12">
                        <label className="form__group__label" >Update file</label>
                        <BaasicDropzone
                            acceptFiles={uploadTypes}
                            loading={uploadLoading}
                            onFilesDrop={onAttachmentDrop}
                            multiple={false}
                        />
                    </div>
                    <div className="col col-sml-6 col-lrg-6">
                        <BaasicButton
                            className="btn btn--base btn--primary u-mar--right--sml"
                            onClick={() => insertImage(true)}
                            disabled={false}
                            rotate
                            icon={
                                uploadLoading
                                    ? "synchronize-arrows-1 rotate"
                                    : ''
                            }
                            label={t('SAVE')}
                        />
                    </div>
                    <div className="col col-sml-6 col-lrg-6">
                        <BaasicButton
                            className="btn btn--base btn--secondary u-mar--right--sml"
                            onClick={() => insertImage(false)}
                            disabled={false}
                            rotate
                            icon={
                                uploadLoading
                                    ? "synchronize-arrows-1 rotate"
                                    : ''
                            }
                            label={t('SAVE_LATER')}
                        />
                    </div>
                </div>
            </div>
        </Page >
    )
};

CharityUpdateFileTemplate.propTypes = {
    charityUpdateFileViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityUpdateFileTemplate);

