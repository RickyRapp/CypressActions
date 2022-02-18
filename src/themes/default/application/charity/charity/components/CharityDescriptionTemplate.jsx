import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicTextArea,
    BaasicButton
} from 'core/components'

const CharityDescriptionTemplate = function ({t, charityDescriptionViewStore}){

    const {
        form,
        item,
        isEditEnabled,
        onEnableEditClick
    } = charityDescriptionViewStore;

    return(
        <div >
            <EditFormContent form={form}>
                <div className="row">
					<div className="col col-sml-12 col-lrg-3">
                            <h3 className=" u-mar--bottom--med">
                                {t('CHARITY.DESCRIPTION.TITLE')}
                             </h3>
                    </div>
                    {isEditEnabled ? (
                        <React.Fragment>
                            <div className='col col-sml-12 col-lrg-12'>
                                <div className='card--med card--primary'>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-6 u-mar--bottom--sml">
                                        <BasicTextArea field={form.$('description')} />
                                    </div>
                                </div>

                            <div className="col col-sml-12 info-card--footer">
								<BaasicButton
									type="button"
									className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
									onClick={onEnableEditClick}
									label="Cancel"
								/>
								<BaasicFormControls form={form} onSubmit={form.onSubmit} />
							</div>
                </div>
                </div>
                </React.Fragment>
                ) : (
                    <div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
							<div className="row info-card--scale">
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Description:</p>
									<p className="type--base type--wgt--bold">
										Lorem ipsum.....
									</p>
								</div>
							</div>
					</div>
                    )}
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