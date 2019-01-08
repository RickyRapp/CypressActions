import { action, observable } from "mobx";
import _ from "lodash";
import { UserCreateForm } from "modules/user/forms";
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";

class UserCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const { user: userService, role: roleService } = rootStore.app.baasic.membershipModule;

        super(rootStore, {
            name: "user",
            actions: {
                create: async newUser => {
                    newUser.roles = _.map(newUser.roles, roleName => {
                        return {
                            name: roleName.name
                        };
                    });
                    newUser.creationDate = new Date();
                    newUser.isApproved = true;

                    try {
                        await userService.createUser(newUser);
                        rootStore.notificationStore.success(
                            "Successfully created new user"
                        );
                    } catch ({ statusCode, data }) {
                        this.form.invalidate(data);
                    }
                }
            },
            FormClass: UserCreateForm
        });

        this.userService = userService;
        this.roleDropdownStore = new BaasicDropdownStore({
            filterable: true,
            multi: true,
            textField: 'name',
            dataItemKey: 'id'
        },
        {
            fetchFunc: async (term) => {
                let options = {};

                if (term && term !== "") {
                    options.searchQuery = term;
                }
                
                const response = await roleService.find(options);
                return response.data.item;
            },
        });
    }
}

export default UserCreateViewStore;
