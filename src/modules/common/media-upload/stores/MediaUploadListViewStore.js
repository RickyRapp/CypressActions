import React from 'react';
import { action } from 'mobx';
import { CharityService, FileStreamRouteService, FileStreamService } from "common/data";
import { CharityListFilter } from 'modules/administration/charity/models';
import { BaseListViewStore, TableViewStore } from "core/stores";
import NumberFormat from 'react-number-format';
import { localizationService } from 'core/services'
import { converter } from 'core/utils';
import _ from 'lodash';

class MediaUploadListViewStore extends BaseListViewStore {
    constructor(rootStore, { userId }) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        let filter = new CharityListFilter();


        super(rootStore, {
            name: 'uploaded files',
            routes: {
                delete: (coreMediaVaultEntry) =>
                    this.deleteConfirm(coreMediaVaultEntry)
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    params.id = userId;
                    const response = await charityService.findDocuments(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.fileStreamRouteService = new FileStreamRouteService();
        this.fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
        this.load();
    }

    @action.bound async load() {
        const renderSize = (item) => {
            return <NumberFormat value={converter(item.coreMediaVaultEntry.fileSize, 'B', 'MB')} displayType={'text'} thousandSeparator={true} suffix={'MB'} />;
        }

        const downloadLink = (id) => this.fileStreamRouteService.getDownloadLink(id);
        const renderDownloadName = (item) => {
            return <a onClick={() => window.open(downloadLink(item.coreMediaVaultEntry.id))} download>{item.coreMediaVaultEntry.fileName}</a>
        }

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'coreMediaVaultEntry.fileName',
                        title: 'Name',
                        type: 'function',
                        function: renderDownloadName
                    },
                    {
                        key: 'coreMediaVaultEntry.fileSize',
                        title: 'Size',
                        type: 'function',
                        function: renderSize
                    },
                    {
                        key: 'coreMediaVaultEntry.fileExtension',
                        title: 'Extension'
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Uploaded',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    }
                ],
                actions: {
                    onDelete: item => this.routes.delete(item.coreMediaVaultEntry),
                },
                actionsRender: {}
            })
        );

        this.loaded = true;
    }

    @action.bound
    async deleteConfirm(coreMediaVaultEntry) {
        this.rootStore.modalStore.showConfirm(
            `${localizationService.t('AREYOUSUREYOUWANTTODELETEFILE')} ${coreMediaVaultEntry.fileName}`,
            async () => {
                await this.fileStreamService.deleteFile(coreMediaVaultEntry.id);
                await this.queryUtility._reloadCollection();
                this.rootStore.notificationStore.success(`${localizationService.t('SUCCESSFULLYDELETED')} ${coreMediaVaultEntry.fileName}`);
            }
        );
    }
}


export default MediaUploadListViewStore;