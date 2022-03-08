import { moduleProviderFactory } from "core/providers";
import { remoteDepositList, remoteDepositEdit, remoteDepositPreview } from "application/charity/remote-deposit/pages";

(function() {
	moduleProviderFactory.application.register({
		routes: [
			{
				name: "master.app.main.charity.remote-deposit",
				pattern: "/remote-deposit",
				children: [
					{
						name: "master.app.main.charity.remote-deposit.list",
						pattern: "",
						component: remoteDepositList,
						authorization: "theDonorsFundCharitySection.read",
						data: {
							title: "Remote Deposits",
						},
					},
					{
						name: "master.app.main.charity.remote-deposit.create",
						pattern: "/create",
						component: remoteDepositEdit,
						authorization: "theDonorsFundCharitySection.create",
						data: {
							back: "master.app.main.charity.remote-deposit.list",
						},
					},
					{
						name: "master.app.main.charity.remote-deposit.edit",
						pattern: "/edit/:id",
						component: remoteDepositEdit,
						authorization: "theDonorsFundCharitySection.read",
						data: {
							back: "master.app.main.charity.remotedeposit.preview",
						},
					},
					{
						name: "master.app.main.charity.remote-deposit.preview",
						pattern: "/preview/:id",
						component: remoteDepositPreview,
						authorization: "theDonorsFundCharitySection.read",
						data: {
							back: "master.app.main.charity.remote-deposit.list",
						},
					},
				],
			},
		]
	});
})();
