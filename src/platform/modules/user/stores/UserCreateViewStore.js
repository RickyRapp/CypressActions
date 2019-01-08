import { action, observable } from "mobx";
import _ from "lodash";
import { UserCreateForm } from "platform/modules/user/forms";
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";

class UserCreateViewStore extends BaseEditViewStore {
    @observable roles = [];

    constructor(rootStore) {
        const userStore = rootStore.platform.user.userStore;

        super(rootStore, {
            name: "user",
            id: undefined,
            actions: {
                create: async newUser => {
                    newUser.roles = _.map(newUser.roles, roleName => {
                        return {
                            name: roleName.label
                        };
                    });
                    newUser.creationDate = new Date();
                    newUser.isApproved = true;

                    try {
                        await userStore.createUser(newUser);
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

        this.userStore = userStore;
        this.roleDropdownStore = new BaasicDropdownStore({
            filterable: true,
            multi: true
        });

        this.fetchRoles();
    }

    @action async fetchRoles() {
        this.roleDropdownStore.setLoading(true);
        const roles = await this.userStore.fetchRoles();
        const items = _.map(roles, i => ({
            label: i.name,
            value: i.id
        }));
        this.roleDropdownStore.setItems(items);
        this.roleDropdownStore.setLoading(false);
    }
}

export default UserCreateViewStore;
