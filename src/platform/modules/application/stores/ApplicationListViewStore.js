import { action, computed, runInAction, observable } from "mobx";
import { BaseListViewStore, LoaderStore, TableViewStore } from "core/stores";
import { QueryUtility } from "core/utils";

class ApplicationListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const applicationService = rootStore.platform.application.applicationStore;

        super(rootStore, {
            name: "application",
            actions: {
                find: applicationService.find
            }
        });

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                   {
                        key: "applicationTitle",
                        title: "Name",
                        onClick: (item) => {
                            this.rootStore.routerStore.navigate('master.app.main.user.list', { appId: item.identifier });
                        },
                    },
                    {
                        key: "identifier",
                        title: "Identifier"
                    }
                ],
                actions: {
                    onSort: column => this.queryUtility.changeOrder(column.key)
                }                
            })
        );
    }
}

export default ApplicationListViewStore;
