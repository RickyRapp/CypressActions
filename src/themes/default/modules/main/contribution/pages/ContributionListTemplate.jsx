import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BaasicTable, TableFilter, Export, BaasicModal } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ContributionDetails } from 'modules/common/contribution/pages';
import { ListFilterTemplate } from 'themes/modules/common/contribution/components';
import moment from 'moment';
import _ from 'lodash';

function ContributionListTemplate({ contributionListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create },
        contributionStatusDropdownStore,
        paymentTypeDropdownStore,
        contributionService,
        selectedExportColumnsName,
        additionalExportColumnsName,
        detailsModalParams,
        contributionId
    } = contributionListViewStore;

    return (
        <React.Fragment>
            <React.Fragment>
                <ListLayout onCreate={create} loading={loaderStore.loading}>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                <ListFilterTemplate
                                    queryUtility={queryUtility}
                                    paymentTypeDropdownStore={paymentTypeDropdownStore}
                                    contributionStatusDropdownStore={contributionStatusDropdownStore} />
                            </div>
                        </TableFilter>
                        <Export
                            queryUtility={queryUtility}
                            selectedExportColumnsName={selectedExportColumnsName}
                            additionalExportColumnsName={additionalExportColumnsName}
                            service={contributionService}
                        />
                    </div>
                    {tableStore &&
                        <BaasicTable
                            tableStore={tableStore}
                            loading={loaderStore.loading}
                        />}
                </ListLayout>
                <BaasicModal modalParams={detailsModalParams} >
                    <div className="col col-sml-12 card card--form card--primary card--lrg">
                        <ContributionDetails id={contributionId} />
                    </div>
                </BaasicModal>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionListTemplate);
