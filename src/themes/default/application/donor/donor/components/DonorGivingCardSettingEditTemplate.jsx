import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicFieldDropdown,
    NumericInputField,
    BasicInput
} from 'core/components'
import moment from 'moment';

const DonorGivingCardSettingEditTemplate = function ({ t, donorGivingCardSettingEditViewStore }) {
    const {
        loaderStore,
        form,
        item,
        isEdit,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        toggleEdit,
        onChangeIsEnabled,
        reportCard,
        setCardAction
    } = donorGivingCardSettingEditViewStore;
    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                {isEdit && item ?
                    <div className="list--preferences">
                        <div className="list--preferences__label">
                            <h3 className="list--preferences__title">{t('DONOR_GIVING_CARD_SETTING.EDIT.TITLE')}</h3>
                        </div>
                        <div className="list--preferences__field">
                            <a onClick={() => toggleEdit()}>{form.$('isEnabled').value ? "Cancel Edit" : "Edit Settings"}</a>
                            {!reportCard ? <h3 className="list--preferences__title">{t('DONOR_GIVING_CARD_SETTING.CREATE.TITLE')}</h3> : <h3 className="list--preferences__title">{t('DONOR_GIVING_CARD_SETTING.CREATE.REPORT_STOLEN_TITLE')}</h3>}
                        </div>
                        <div className="list--preferences__field">
                            {item && item.givingCard && !(item.givingCard.isStolen || item.givingCard.isLost) && (!reportCard ? <a onClick={() => setCardAction()}>{t('DONOR_GIVING_CARD_SETTING.CREATE.REPORT_STOLEN_TITLE')}</a> : <a onClick={() => setCardAction()}>{t('DONOR_GIVING_CARD_SETTING.CREATE.TITLE')}</a>)}
                            {/* <BasicFieldCheckbox showLabel={false} field={form.$('isEnabled')} onChange={onChangeIsEnabled} /> */}
                        </div>
                        {/* <div className="list--preferences__field">
                            <BasicFieldCheckbox showLabel={false} field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                        </div> */}
                    </div>
                    :
                    <h3 className="list--preferences__title">{t('DONOR_GIVING_CARD_SETTING.CREATE.TITLE')}</h3>
                }
                {!reportCard ? <div><div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        Share information <span className="type--color--note u-mar--left--tny">*</span>
                    </div>
                    <div className="list--preferences__dd">
                        <BaasicFieldDropdown showLabel={false} field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        Purpose <span className="type--color--note u-mar--left--tny">*</span>
                    </div>
                    <div className="list--preferences__dd">
                        <BaasicFieldDropdown showLabel={false} field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">
                        Maximum dollar amount per transaction
                    </div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('maxAmount')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">
                        Maximum transactions per day
                    </div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('maxTimesPerDay')} />
                    </div>
                </div>

                <div className="row">

                    {item && item.givingCard &&
                        <div className="form__group col col-sml-12 col-xlrg-6">
                            <div className="form__group__label">
                                Assigned Card
                        </div>
                            {item.givingCard.cardNumber} - {item.givingCard.cvv} - {moment(new Date(item.givingCard.expirationDate)).format('MM/YY')}
                            {!item.givingCard.isActivated && <div>Card is not activated </div>}
                            {item.givingCard.isLost && <div style={{color: 'salmon', fontWeight: 'bold'}}>Card is reported lost! </div>}
                            {item.givingCard.isStolen && <div style={{color: 'salmon', fontWeight: 'bold'}}>Card is reported stolen! </div>}
                        </div>}
                </div></div> : 
                <div>
                    <BasicFieldCheckbox showLabel={true} field={form.$('isStolen')} onChange={onChangeIsEnabled} />&nbsp;&nbsp;
                    <BasicFieldCheckbox showLabel={true} field={form.$('isLost')} onChange={onChangeIsEnabled} /> <br /><br />
                    <BasicInput field={form.$('reportDescription')} /> <br /><br />
                    <span className="card--primary">Important! Please be aware that once you complete this report, your card will immediately be disabled.</span>
                    </div>}
                
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorGivingCardSettingEditTemplate.propTypes = {
    donorGivingCardSettingEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGivingCardSettingEditTemplate);
