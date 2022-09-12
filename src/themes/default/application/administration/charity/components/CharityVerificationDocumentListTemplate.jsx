import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumericInputField,
} from 'core/components';
import { Content } from 'core/layouts';

function CharityVerificationDocumentListTemplate({ charityVerificationDocumentListViewStore, t }) {
    const {
        item,
        url
    } = charityVerificationDocumentListViewStore;

    return (
        <Content>
            {item && item.length > 0 ? (
                item.map(document => {
                    return (
                        <div key={document.id} className="u-mar--bottom--base">
                            <a href={url + document.coreMediaVaultEntry.id} target="_blank" className="type--wgt--bold">
                                <span className="u-display--ib w--30--px"> </span>
                                {document.coreMediaVaultEntry.fileName}
                            </a>
                        </div>
                    );
                })
            ) : (
                <div className="card--med">
                    <p className="type--sml type--wgt--bold type--color--opaque">No files yet.</p>
                </div>
            )}
        </Content>
    )
}

CharityVerificationDocumentListTemplate.propTypes = {
    charityVerificationDocumentListViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityVerificationDocumentListTemplate);
