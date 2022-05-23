import React from 'react';
import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionListFilter } from 'application/administration/session/models';
import { applicationContext, donorFormatter } from 'core/utils';
import { FormatterResolver } from 'core/components';
import { charityFormatter } from 'core/utils';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash'
import { FilterParams } from 'core/models';

@applicationContext
class SessionForDonorReviewViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return (await rootStore.application.administration.sessionStore.findSessionForDonorReview(params));
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'SESSION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'charityName',
                    title: 'SESSION.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'checkNumber',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHECK_NUMBER_LABEL',
                },
                {
                    key: 'amount',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
            ],
            actions: {},
            actionsRenderer: {}
        }));
    }

}

export default SessionForDonorReviewViewStore;
