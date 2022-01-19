import { TableViewStore, BaseListViewStore } from "core/stores";
import { DepositInfoService } from "application/administration/depositinfo/services";

class DepositInfoListViewStore extends BaseListViewStore {
	constructor(rootStore) {
		const service = new DepositInfoService(rootStore.application.baasic.apiClient);
		super(rootStore, {
			autoInit: true,
			routes: {
				edit: id => {
					this.rootStore.routerStore.goTo("master.app.main.depositinfo.edit", { id: id });
				},
				create: () => {
					this.rootStore.routerStore.goTo("master.app.main.depositinfo.create");
				},
				preview: id => {
					this.rootStore.routerStore.goTo("master.app.main.depositinfo.preview", { id: id });
				},
			},
			actions: () => {
				return {
					find: async params => {
						const response = await service.find(params);
						return response.data;
					},
					delete: service.delete,
				};
			},
		});

		this.setTableStore(
			new TableViewStore(this.queryUtility, {
				columns: [
					$BLOCK_COMMENT_START{
						key: "name",
						title: "DEPOSITINFO.LIST.COLUMNS.NAME",
						onClick: item => this.routes.preview(item.id),
						authorization: this.authorization.read,
					},
					{
						key: "status.name",
						title: "DEPOSITINFO.LIST.COLUMNS.STATUS_NAME",
						sortable: false,
						cell: StatusCell, $LINE_COMMENT Define custom cell rendering component
					},
					{
						key: "price",
						title: "DEPOSITINFO.LIST.COLUMNS.PRICE",
						format: { type: "currency" }, $LINE_COMMENT Extend FormatterResolverTemplate with custom formats
					},$BLOCK_COMMENT_END
				],
				actions: {
					onEdit: item => this.routes.edit(item.id),
					onPreview: item => this.routes.preview(item.id),
				},
			})
		);
	}
}

export default DepositInfoListViewStore;