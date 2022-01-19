// import { moduleProviderFactory } from "core/providers";
// import { DepositInfoList, DepositInfoEdit, DepositInfoPreview } from "application/administration/depositinfo/pages";

// (function() {
// 	moduleProviderFactory.application.register({
// 		routes: [
// 			{
// 				name: "master.app.main.depositinfo",
// 				pattern: "/${route}",
// 				children: [
// 					{
// 						name: "master.app.main.depositinfo.list",
// 						pattern: "",
// 						component: DepositInfoList,
// 						authorization: "${sectionName}.read",
// 						data: {
// 							title: "DEPOSITINFO.LIST.TITLE",
// 						},
// 					},
// 					{
// 						name: "master.app.main.depositinfo.create",
// 						pattern: "/create",
// 						component: DepositInfoEdit,
// 						authorization: "${sectionName}.create",
// 						data: {
// 							back: "master.app.main.depositinfo.list",
// 						},
// 					},
// 					{
// 						name: "master.app.main.depositinfo.edit",
// 						pattern: "/edit/:id",
// 						component: DepositInfoEdit,
// 						authorization: "${sectionName}.update",
// 						data: {
// 							back: "master.app.main.depositinfo.preview",
// 						},
// 					},
// 					{
// 						name: "master.app.main.depositinfo.preview",
// 						pattern: "/preview/:id",
// 						component: DepositInfoPreview,
// 						authorization: "${sectionName}.update",
// 						data: {
// 							back: "master.app.main.depositinfo.list",
// 						},
// 					},
// 				],
// 			},
// 		],
// 		menu: [
// 			{
// 				title: "MENU.DEPOSITINFO",
// 				icon: "css-icon-name",
// 				authorization: "${sectionName}.read",
// 				route: "master.app.main.depositinfo.list",
// 				order: 0,
// 				$BLOCK_COMMENT_START subMenu: [
// 					{
// 						title: "MENU.${SUBMENU_MODULE_NAME}",
// 						order: 1,
// 						icon: "css-submenu-icon-name",
// 						route: "master.app.main.${submenuRoute}.list",
// 					},
// 				], $BLOCK_COMMENT_END
// 			},
// 		],
// 	});
// })();
