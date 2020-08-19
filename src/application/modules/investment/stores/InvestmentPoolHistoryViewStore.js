import React from 'react';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { InvestmentPoolHistoryService } from 'application/investment/services';
import { applicationContext } from 'core/utils';
import { InvestmentPoolHistoryFilter } from '../models';
import { FormatterResolver } from 'core/components';

@applicationContext
class InvestmentPoolHistoryViewStore extends BaseListViewStore {
    constructor(rootStore, investmentPoolId) {
        const filter = new InvestmentPoolHistoryFilter('dateCreated', 'desc')
        filter.investmentPoolIds = [investmentPoolId]
        super(rootStore, {
            name: 'investment',
            routes: {},
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            },
            actions: () => {
                const service = new InvestmentPoolHistoryService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['investmentPool']
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'investmentPool.name',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.NAME'
                },
                {
                    key: 'currentShareValue',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.VALUE',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return <div>
                                <FormatterResolver
                                    item={{ currentShareValue: item.currentShareValue }}
                                    field='currentShareValue'
                                    format={{ type: 'currency' }}
                                />
                                {item.change != 0 &&
                                    <span>
                                        <span
                                            className='u-icon u-icon--tny u-icon--arrow-down'
                                            style={{ transform: `rotate(${item.change > 0 ? '180' : '0'}deg)` }}></span>
                                        <span style={{ color: `${item.change > 0 ? 'green' : 'red'}` }}>
                                            <FormatterResolver
                                                item={{ difference: item.previousShareValue * item.change }}
                                                field='difference'
                                                format={{ type: 'currency' }}
                                            />
                                        </span>
                                    </span>
                                }
                            </div>

                        }
                    }
                },
                {
                    key: 'change',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.CHANGE',
                    format: {
                        type: 'percentage',
                        decimalScale: 6
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.DATE_CREATED',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disableSorting: true
        }));
    }
}

export default InvestmentPoolHistoryViewStore;
