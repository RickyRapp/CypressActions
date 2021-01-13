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
        tableStore
    } = donorGivingCardSettingListViewStore;

    console.log(tableStore)
    return (
        <div>
            <ListContent>
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--tny">
                    {t('DONOR_GIVING_CARD_SETTING.LIST.TITLE')}
                </h3>
                {tableStore.dataInitialized &&
                    <Content>
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR_GIVING_CARD_SETTING.EDIT.TITLE')}</h3>
                        {tableStore.data.map(c => {
                            return (
                                <DonorGivingCardSettingEdit key={c.id} setting={c} />
                            )
                        })}
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR_GIVING_CARD_SETTING.CREATE.TITLE')}</h3>
                        <DonorGivingCardSettingEdit />
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

