import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ListContent
} from 'core/components';
import { Content } from 'core/layouts';
import { DonorGivingCardSettingEdit } from 'application/donor/donor/components';

const DonorGivingCardSettingListTemplate = function ({ donorGivingCardSettingListViewStore, t }) {
    const {
        tableStore, toggleNewCard, isNewCard
    } = donorGivingCardSettingListViewStore;

    return (
        <div>
            <ListContent>
                <h3 className="list--preferences__title">
                    {t('DONOR_GIVING_CARD_SETTING.LIST.TITLE')} 
                </h3>
                {tableStore.dataInitialized &&
                    <Content>
                        {tableStore.data.map(c => {
                            return (
                                (!isNewCard && <DonorGivingCardSettingEdit key={c.id} setting={c} />)
                            )
                        })}
                        {isNewCard && <DonorGivingCardSettingEdit />}
                        {tableStore.data.length > 0 ? <a onClick={() => toggleNewCard()}>{isNewCard ? "My Cards" : "Request New Card"}</a> : <DonorGivingCardSettingEdit />}
                    </Content>}
            </ListContent>
        </div>
    )
};

DonorGivingCardSettingListTemplate.propTypes = {
    donorGivingCardSettingListViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGivingCardSettingListTemplate);

