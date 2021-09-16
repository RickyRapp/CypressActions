import { FormBase } from 'core/components';

export default class CharityWebsiteCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityId',
                    label: 'CHARITY_WEBSITE.CREATE.FIELDS.CHARITY_LABEL',
                    placeholder: 'CHARITY_WEBSITE.CREATE.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'name',
                    label: 'CHARITY_WEBSITE.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY_WEBSITE.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'ip',
                    label: 'CHARITY_WEBSITE.CREATE.FIELDS.IP_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '###.###.###.###',
                        mask: '_'
                    }
                },
                {
                    name: 'url',
                    label: 'CHARITY_WEBSITE.CREATE.FIELDS.URL_LABEL',
                    placeholder: 'CHARITY_WEBSITE.CREATE.FIELDS.URL_PLACEHOLDER',
                    rules: 'required|url'
                }
            ]
        };
    }
}