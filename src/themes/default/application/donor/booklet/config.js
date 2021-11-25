import { moduleProviderFactory } from 'core/providers';
import { BookletList } from 'application/donor/booklet/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.booklet',
                pattern: '/booklets',
                children: [
                    {
                        name: 'master.app.main.donor.booklet.list',
                        pattern: '',
                        component: BookletList,
                        authorization: 'theDonorsFundBookletSection.read',
                        data: {
                            title: "BOOKLET.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
    });
})();
