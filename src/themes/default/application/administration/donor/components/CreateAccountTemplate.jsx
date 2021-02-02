import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton, BasicFieldCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { action, observable } from 'mobx';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

class CreateAccountTemplate extends Component {
    @observable showForm = false;

    @action.bound
    onShowFormChange(visiblity) {
        this.showForm = visiblity;
    }

    render() {
        const {
            form,
            t,
            title
        } = this.props;

        return (
            <React.Fragment>
                <h3 className=" type--color--note u-mar--bottom--sml">{t(title)}
                    <BaasicButton
                        className="btn btn--icon u-mar--left--sml"
                        icon={`u-icon u-icon--${this.showForm ? 'arrow-down' : 'arrow-right'} u-icon--base`}
                        label={this.showForm ? t('DONOR.CREATE.LOGIN_FORM_FIELDS.HIDE') : t('DONOR.CREATE.LOGIN_FORM_FIELDS.SHOW')}
                        onlyIcon={true}
                        onClick={() => this.onShowFormChange(!this.showForm)}
                    />
                </h3>
                {this.showForm &&
                    <div className="row">
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={form.$('username')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={form.$('password')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={form.$('confirmPassword')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicFieldCheckbox field={form.$('isApproved')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicFieldCheckbox field={form.$('sendApproveEmail')} />
                            {form.$('sendApproveEmail').value &&
                                <Tooltip
                                    position='top'
                                    anchorElement='target'
                                    openDelay={0}
                                    content={() => (form.$('username').value)}>
                                    <i className="u-mar--left--sml u-icon u-icon--mail u-icon--med" title={isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('username').value) ? '' : ' '} />
                                </Tooltip>}
                        </div>
                    </div>}
            </React.Fragment>
        );
    }
}

CreateAccountTemplate.propTypes = {
    form: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CreateAccountTemplate);