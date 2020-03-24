import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown,
    DateRangeQueryPicker,
    NumberFormatInput
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';

const SessionCertificateListTemplate = function ({ sessionCertificateViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchCharityDropdownStore,
        searchDonorAccountDropdownStore,
        dateCreatedDateRangeQueryStore
    } = sessionCertificateViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                    <AuthDropdown
                        store={searchDonorAccountDropdownStore}
                        authorization='theDonorsFundAdministrationSection.read' />

                    <AuthDropdown
                        store={searchCharityDropdownStore}
                        authorization='theDonorsFundDonorSection.read' />

                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <NumberFormatInput
                            className='input input--sml'
                            value={queryUtility.filter['bookletCertificateCode']}
                            onChange={(event) => queryUtility.filter['bookletCertificateCode'] = event.formattedValue}
                            format='#####-##'
                            mask=''
                        />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <DateRangeQueryPicker
                            queryUtility={queryUtility}
                            store={dateCreatedDateRangeQueryStore}
                            fromPropertyName='dateCreatedFrom'
                            toPropertyName='dateCreatedTo'
                        />
                    </div>
                </TableFilter>
            </div>
            <div className="card--form card--primary card--med">
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                />
            </div>
        </Content>
    )
};

const AuthDropdown = withAuth(DropdownComponent);
function DropdownComponent({ store }) {
    return (
        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
            <BaasicDropdown store={store} />
        </div>
    );
}

DropdownComponent.propTypes = {
    store: PropTypes.object.isRequired
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION_CERTIFICATE.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION_CERTIFICATE.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionCertificateListTemplate.propTypes = {
    sessionCertificateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(SessionCertificateListTemplate);

