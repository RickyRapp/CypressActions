import React from 'react';
import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionListFilter } from 'application/administration/session/models';
import { applicationContext, donorFormatter } from 'core/utils';
import { FormatterResolver } from 'core/components';
import { charityFormatter } from 'core/utils';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash'

@applicationContext
class SessionForDonorReviewViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new SessionListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return this.rootStore.application.administration.sessionStore.findSessionForDonorReview(params);
                    }
                }
            }
        });

        this.createTableStore();
    }

    

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'confirmationNumber',
                    title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                }
            ],
            actions: {
                onEdit: (session) => this.routes.edit(session.id)
            },
            actionsRender: {
                onEditRender: (item) => {
                    console.log(item);
                    return true;
                }
            }
        }));

    }

}

export default SessionForDonorReviewViewStore;
