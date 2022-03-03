import { TableViewStore, BaseListViewStore } from "core/stores";
import { remoteDepositService } from "application/charity/remote-deposit/services";

class remoteDepositListViewStore extends BaseListViewStore {
	constructor(rootStore) {
		const service = new remoteDepositService(rootStore.application.baasic.apiClient);
		super(rootStore, {
			autoInit: true,
			routes: {
				edit: id => {
					this.rootStore.routerStore.goTo("master.app.main.remotedeposit.edit", { id: id });
				},
				create: () => {
					this.rootStore.routerStore.goTo("master.app.main.remotedeposit.create");
				},
				preview: id => {
					this.rootStore.routerStore.goTo("master.app.main.remotedeposit.preview", { id: id });
				},
			},
			actions: () => {
				return {
					find: async params => {
						console.log(params);
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
					{
						key: 'confirmationNumber',
						title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
					},
					{
						key: 'charity.name',
						title: 'SESSION.LIST.COLUMNS.CHARITY_NAME_LABEL',
					},
					{
						key: 'amount',
						title: 'SESSION.LIST.COLUMNS.AMOUNT_LABEL',
						format: {
							type: 'function',
							value: (item) => {
								return <React.Fragment>
									<FormatterResolver
										item={{ amount: item.amount }}
										field='amount'
										format={{ type: 'currency' }}
									/>
									{item.json &&
										<span data-tip={`${item.json}`} data-type="info" style={{cursor: 'pointer'}}>
											<b>&nbsp;[?]</b>
											<ReactTooltip />
										</span>
									}
								</React.Fragment >
	
							}
						}
					},
					{
						key: 'grants',
						title: 'SESSION.LIST.COLUMNS.SESSION_STATUS_LABEL',
						format: {
							type: 'function',
							value: (item) => {
								return item.grants && item.grants.length > 0 && item.grants[0].donationStatus.name
							}
						}
					},
					{
						key: 'dateCreated',
						title: 'SESSION.LIST.COLUMNS.DATE_CREATED_LABEL',
						format: {
							type: 'date',
							value: 'short'
						}
					}
				],
				actions: {
					onEdit: item => this.routes.edit(item.id),
					onPreview: item => this.routes.preview(item.id),
				},
			})
		);
	}
}

export default remoteDepositListViewStore;