import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { BookletOrderCreateFormTemplate } from 'themes/modules/common/booklet-order/components';
import _ from 'lodash';

function BookletOrderCreateTemplate({ bookletOrderCreateViewStore, t }) {
  const {
    form,
    loading,
    userId,
    deliveryMethodTypeDropdownStore,
    denominationTypeDropdownStore,
    onDel,
    refresh,
    expresMailDeliveryMethodTypeId,
    totalAndFee,
    donorAccount,
    mostCommonDenominations
  } = bookletOrderCreateViewStore;

  return (
    <React.Fragment>
      {form &&
        <EditFormLayout form={form} isEdit={false} loading={loading}>
          <PageContentHeader>
            <DonorAccountHeaderDetails userId={userId} type='booklet-order' />
          </PageContentHeader>
          <BookletOrderCreateFormTemplate
            form={form}
            deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
            denominationTypeDropdownStore={denominationTypeDropdownStore}
            onDel={onDel}
            refresh={refresh}
            expresMailDeliveryMethodTypeId={expresMailDeliveryMethodTypeId}
            totalAndFee={totalAndFee}
            donorAccount={donorAccount}
            mostCommonDenominations={mostCommonDenominations}
          />
        </EditFormLayout>}
    </React.Fragment >
  );
};

export default defaultTemplate(BookletOrderCreateTemplate);
